// itemActions.ts
import { Dispatch } from 'redux';
import { ADD_ITEM, EDIT_ITEM, DELETE_ITEM, FETCH_LUGGAGE_ITEMS_SUCCESS, FETCH_LUGGAGE_ITEMS_FAILURE, FETCH_LUGGAGE_ITEMS_START, FETCH_ITEM_BY_ID_START, FETCH_ITEM_BY_ID_SUCCESS, FETCH_ITEM_BY_ID_FAILURE, FETCH_ALL_LUGGAGE_ITEMS_START, FETCH_ALL_LUGGAGE_ITEMS_SUCCESS, FETCH_ALL_LUGGAGE_ITEMS_FAILURE } from './ActionTypes/LuggageActionTypes';
import { Item } from './ActionTypes/LuggageActionTypes';
import { NavigationProp } from '@react-navigation/native';
//firebase
import { collection, addDoc, doc, query, where, onSnapshot, deleteDoc, updateDoc, getDoc, orderBy } from 'firebase/firestore'         
import { db } from '../firebase/config';
import { LuggageStackParamList } from '../Navigation/LuggageStackNavigator';
import Toast from 'react-native-toast-message'


// export const fetchItemsInSuitcase = (suitcaseId) => {
//   return (dispatch: Dispatch) => {
//     dispatch({ type: FETCH_LUGGAGE_ITEMS_START });

//     const luggageItemsRef = query(
//       collection(db, 'luggageItems'),
//       where('suitcaseId', '==', suitcaseId),
//       orderBy('timestamp', 'desc')  
//     );
//     onSnapshot(
//       luggageItemsRef,
//       snapshot => {
//         const luggageItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
//         dispatch({ type: FETCH_LUGGAGE_ITEMS_SUCCESS, payload: luggageItems });
//       },
//       error => {
//         console.error('Error fetching luggageItems:', error); 
//         dispatch({ type: FETCH_LUGGAGE_ITEMS_FAILURE, payload: error });
//       }
//     );
//   };
// };
export const fetchItemsInSuitcase = (suitcaseId) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_LUGGAGE_ITEMS_START });

    const luggageItemsRef = query(
      collection(db, 'luggageItems'),
      where('suitcaseId', 'array-contains', suitcaseId),
      // orderBy('timestamp', 'desc')
    );
    onSnapshot(
      luggageItemsRef,
      snapshot => {
        const luggageItems = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        dispatch({ type: FETCH_LUGGAGE_ITEMS_SUCCESS, payload: luggageItems });
      },
      error => {
        console.error('Error fetching luggageItems:', error);
        dispatch({ type: FETCH_LUGGAGE_ITEMS_FAILURE, payload: error });
      }
    );
  };
};



// export const addItem = (item: Item, navigation: NavigationProp<LuggageStackParamList, 'AddItemForm'>) => {
//   return (dispatch: Dispatch) => {

//     const itemWithTimestamp = {
//       ...item,
//       timestamp: new Date(),
//     };

//     addDoc(collection(db, 'luggageItems'), itemWithTimestamp)
//       .then((itemDocRef) => {
//         dispatch({ type: ADD_ITEM, payload: { item } });
//         navigation.goBack();
//       })
//       .catch((error) => {
//         console.error('Error adding item:', error);
//       });
//   };
// };

export const addItem = (item: Item, suitcaseId: string[], navigation: NavigationProp<LuggageStackParamList, 'AddItemForm'>) => {
  return (dispatch: Dispatch) => {

    const itemWithTimestamp = {
      ...item,
      suitcaseId: suitcaseId, 
      timestamp: new Date(),
    };

    addDoc(collection(db, 'luggageItems'), itemWithTimestamp)
      .then((itemDocRef) => {
        dispatch({ type: ADD_ITEM, payload: { item } });
        navigation.goBack();
        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "success",
          text1: "Item added to suitcase ✨",
          
        });
      })
      .catch((error) => {
        console.error('Error adding item:', error);
        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "error",
          text1: "Error. Please try again.",
        });
      });
  };
};

export const addSuitcaseIdToItem = (itemId: string, newSuitcaseId: string) => {
  return (dispatch: Dispatch) => {
    const itemRef = doc(db, 'luggageItems', itemId);

    getDoc(itemRef)
      .then((itemDoc) => {
        if (itemDoc.exists()) {
          const itemData = itemDoc.data();
          const updatedSuitcaseId = [...itemData.suitcaseId, newSuitcaseId];

          updateDoc(itemRef, { suitcaseId: updatedSuitcaseId })
            .then(() => {
              dispatch({ type: UPDATE_ITEM, payload: { itemId, suitcaseId: updatedSuitcaseId } });
              Toast.show({
                visibilityTime: 2000,
                autoHide: true,
                type: "success",
                text1: "Item added to suitcase ✨",
                
              });
            })
            .catch((error) => {
              console.error('Error updating item:', error);
            });
        } else {
          console.error('Item not found.');
        }
      })
      .catch((error) => {
        console.error('Error fetching item:', error);
      });
  };
};


// export const editItem = (itemId: string, updatedItem: Partial<Item>) => {
//   return (dispatch: Dispatch) => {
//     updateDoc(doc(db, 'luggageItems', itemId), updatedItem)
//       .then(() => {
//         dispatch({ type: EDIT_ITEM, payload: { id: itemId, updatedData: updatedItem } });
//       })
//       .catch((error) => {
//         console.error('Error editing item:', error);
//       });
//   };
// };

// Modify your editItem function
export const editItem = (itemId: string, updatedItem: Partial<Item>, action: string) => {
  return (dispatch: Dispatch) => {
    updateDoc(doc(db, 'luggageItems', itemId), updatedItem)
      .then(() => {
        dispatch({ type: EDIT_ITEM, payload: { id: itemId, updatedData: updatedItem } });

        let toastMessage = "";
        switch (action) {
          case "add":
            toastMessage = "Item added to suitcase ✨";
            break;
          case "remove":
            toastMessage = "Item removed from suitcase ❌";
            break;
          case "edit":
            toastMessage = "Item edited 👍";
            break;
          default:
            toastMessage = "Action completed";
        }

        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "success",
          text1: toastMessage,
        });
      })
      .catch((error) => {
        console.error('Error editing item:', error);

        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "error",
          text1: "Error. Please try again.",
        });
      });
  };
};


export const deleteItem = (itemId: string) => {
  return (dispatch: Dispatch) => {
    deleteDoc(doc(db, 'luggageItems', itemId))
      .then(() => {
        dispatch({ type: DELETE_ITEM, payload: itemId });
        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "success",
          text1: "Item deleted ❌",
          
        });
      })
      .catch((error) => {
        console.error('Error deleting item:', error);
        Toast.show({
          visibilityTime: 2000,
          autoHide: true,
          type: "error",
          text1: "Error. Please try again.",
        });
      });
  };
};

export const fetchItemById = (itemId: string) => {
  return (dispatch: Dispatch) => {
    const itemDocRef = doc(db, 'luggageItems', itemId);
    dispatch({ type: FETCH_ITEM_BY_ID_START });

    getDoc(itemDocRef)
      .then(itemDoc => {
        if (itemDoc.exists()) {
          const itemData = itemDoc.data() as Item;
          dispatch({ type: FETCH_ITEM_BY_ID_SUCCESS, payload: itemData });
        } else {
          console.error('Error fetching item by ID: does not exist');
          dispatch({ type: FETCH_ITEM_BY_ID_FAILURE, payload: 'Item not found' });
        }
      })
      .catch(error => {
        console.error('Error fetching item by ID:', error);
        dispatch({ type: FETCH_ITEM_BY_ID_FAILURE, payload: error });
      });
  };
};


// export const fetchAllUserLuggageItems = (userId: string, suitcaseId: string | null = null) => {
//   return (dispatch: Dispatch) => {
//     dispatch({ type: FETCH_ALL_LUGGAGE_ITEMS_START });

//     const luggageItemsRef = query(
//       collection(db, 'luggageItems'),
//       where('userId', '==', userId),
//       orderBy('timestamp', 'desc')
//     );

//     onSnapshot(
//       luggageItemsRef,
//       (snapshot) => {
//         const luggageItems = snapshot.docs
//           .map((doc) => ({ id: doc.id, ...doc.data() }))
//           .filter((item) => (suitcaseId ? item.suitcaseId !== suitcaseId : true));

//         dispatch({ type: FETCH_ALL_LUGGAGE_ITEMS_SUCCESS, payload: luggageItems });
//       },
//       (error) => {
//         console.error('Error fetching user luggage items:', error);
//         dispatch({ type: FETCH_ALL_LUGGAGE_ITEMS_FAILURE, payload: error });
//       }
//     );
//   };
// };

export const fetchAllUserLuggageItems = (userId: string, suitcaseId: string | null = null) => {
  return (dispatch: Dispatch) => {
    dispatch({ type: FETCH_ALL_LUGGAGE_ITEMS_START });

    const luggageItemsRef = query(
      collection(db, 'luggageItems'),
      where('userId', '==', userId),
      orderBy('timestamp', 'desc')
    );

    onSnapshot(
      luggageItemsRef,
      (snapshot) => {
        const luggageItems = snapshot.docs
          .map((doc) => ({ id: doc.id, ...doc.data() }))
          .filter((item) => {
            if (suitcaseId) {
              if (Array.isArray(item.suitcaseId)) {
                return !item.suitcaseId.includes(suitcaseId);
              }
              return true;
            }
            return true; 
          });

        dispatch({ type: FETCH_ALL_LUGGAGE_ITEMS_SUCCESS, payload: luggageItems });
      },
      (error) => {
        console.error('Error fetching user luggage items:', error);
        dispatch({ type: FETCH_ALL_LUGGAGE_ITEMS_FAILURE, payload: error });
      }
    );
  };
};


