import { Dispatch } from 'redux';
import {
  ADD_OUTFIT,
  EDIT_OUTFIT,
  DELETE_OUTFIT,
  FETCH_OUTFITS_SUCCESS,
  FETCH_OUTFITS_FAILURE,
  FETCH_OUTFIT_BY_ID_SUCCESS,
  FETCH_OUTFIT_BY_ID_FAILURE,
  FETCH_OUTFITS_START
} from './ActionTypes/OutfitTypes';
import { Outfit } from './ActionTypes/OutfitTypes';
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc, getDoc, getDocs } from 'firebase/firestore'

import { db } from '../firebase/config';

export const addOutfit = (outfit: Outfit) => (dispatch: Dispatch) => {
  addDoc(collection(db, 'outfits'), outfit)
    .then((addedOutfit) => {
      dispatch({ type: ADD_OUTFIT, payload: { id: addedOutfit.id, ...outfit } });
    })
    .catch((error) => {
      console.error('Error adding outfit:', error);
    });
};

export const editOutfit = (id: string, updatedOutfit: Partial<Outfit>) => (dispatch: Dispatch) => {
  updateDoc(doc(db, 'outfits', id), updatedOutfit)
    .then(() => {
      dispatch({ type: EDIT_OUTFIT, payload: { id, updatedData: updatedOutfit } });
    })
    .catch((error) => {
      console.error('Error editing outfit:', error);
    });
};

export const fetchOutfits = () => {
  return (dispatch: Dispatch) => {
    console.log('fetching outfits and luggage items');
    dispatch({ type: FETCH_OUTFITS_START });

    // Fetch the snapshot of all outfit documents
    getDocs(collection(db, 'outfits'))
      .then(outfitsSnapshot => {
        // Map each outfit document to a promise that resolves with the outfit and associated items
        const outfitPromises = outfitsSnapshot.docs.map(outfitDoc => {
          // Extract outfit data from the document
          const outfitData = outfitDoc.data();

          // Get the IDs of associated luggage items
          const luggageItemIds = outfitData.items;

          // Create an array of promises for fetching luggage items
          const luggageItemPromises = luggageItemIds.map(itemId => {
            // Create a reference to the luggage item document
            const itemDocRef = doc(db, 'luggageItems', itemId);

            // Fetch the luggage item document and its data
            return getDoc(itemDocRef)
              .then(itemDoc => {
                // Check if the item document exists
                if (itemDoc.exists()) {
                  // Combine the item ID with item data
                  const itemData = itemDoc.data();
                  return { id: itemId, ...itemData };
                } else {
                  console.error(`Luggage item with ID ${itemId} not found`);
                  return null;
                }
              })
              .catch(error => {
                console.error('Error fetching luggage item:', error);
                return null;
              });
          });

          // Resolve all luggage item promises and combine them with outfit data
          return Promise.all(luggageItemPromises)
            .then(luggageItems => {
              // Combine outfit ID, outfit data, and associated luggage items
              return { id: outfitDoc.id, ...outfitData, luggageItems };
            })
            .catch(error => {
              console.error('Error fetching luggage items:', error);
              return null;
            });
        });

        // Resolve all outfit promises and dispatch the success action
        return Promise.all(outfitPromises)
          .then(outfitsWithItems => {

            dispatch({ type: FETCH_OUTFITS_SUCCESS, payload: outfitsWithItems });
          })
          .catch(error => {
            console.error('Error fetching outfits with items:', error);
            dispatch({ type: FETCH_OUTFITS_FAILURE, payload: error });
          });
      })
      .catch(error => {
        console.error('Error fetching outfits:', error);
        dispatch({ type: FETCH_OUTFITS_FAILURE, payload: error });
      });
  };
};

// export const fetchOutfits = () => {
//   return (dispatch: Dispatch) => { 
//     console.log('fetching luggage items');
//     dispatch({ type: FETCH_OUTFITS_START });

//     const outfitsRef = query(collection(db, 'outfits'));
//     // const outfitsRef = query(collection(db, 'outfits'), where('userId', '==', '123'));
//     onSnapshot(
//       outfitsRef,
//       snapshot => {
//         const outfits = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         console.log(outfits, 'outfits data')
//         dispatch({ type: FETCH_OUTFITS_SUCCESS, payload: outfits });
//       },
//       error => {
//         console.error('Error fetching outfits:', error); 
//         dispatch({ type: FETCH_OUTFITS_FAILURE, payload: error });
//       }
//     );
//   };
// };


export const fetchOutfitById = (outfitId: string) => (dispatch: Dispatch) => {
  db.collection('outfits')
    .doc(outfitId)
    .get()
    .then((outfitDoc) => {
      if (outfitDoc.exists) {
        const outfitData = outfitDoc.data() as Outfit;
        dispatch({ type: FETCH_OUTFIT_BY_ID_SUCCESS, payload: { id: outfitDoc.id, ...outfitData } });
      } else {
        dispatch({ type: FETCH_OUTFIT_BY_ID_FAILURE, payload: new Error('Outfit not found') });
      }
    })
    .catch((error) => {
      console.error('Error fetching outfit by ID:', error);
      dispatch({ type: FETCH_OUTFIT_BY_ID_FAILURE, payload: error });
    });
};
