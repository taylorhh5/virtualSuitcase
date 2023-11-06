import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import AppIntroSlider from 'react-native-app-intro-slider';
import LottieView from 'lottie-react-native';
import colors from '../themes/Colors';

interface DemoProps {
    setDemo: (value: boolean) => void;
}

interface Slide {
    key: string;
    title: string;
    text: string;
    text2?: string;
    image: number;
    backgroundColor: string;
}

export default function Demo({ setDemo }: DemoProps) {

   const slides: Slide[] = [
  {
    key: 'one',
    title: 'Welcome To Virtual Suitcase',
    text: 'The simple way to visualize and organize your luggage.',
    image: require('../Icons/assets/travelerSigns.json'),
    backgroundColor: '#59b2ab',
    width: 90,
  },
  {
    key: 'two',
    title: 'Pack With Confidence',
    text: 'Create a digital inventory of all your luggage items so you can travel with peace of mind.',
    image: require('../Icons/assets/outfitPick.json'),
    backgroundColor: '#22bcb5',
    width: 90,
  },
  {
    key: 'three',
    title: 'Effortless Outfit Planning',
    text: 'Easily plan your outfits and create stunning combinations with a few taps and swipes.',
    image: require('../Icons/assets/outfitPhone.json'),
    backgroundColor: '#22bcb5',
    width: 54,
  },
  {
    key: 'four',
    title: 'X-ray Vision For Your Suitcase',
    text: 'Peek inside your bag and quickly keep track of all your travel essentials.',
    image: require('../Icons/assets/lottieScan.json'),
    backgroundColor: '#febe29',
    width: 90,
  },
  {
    key: 'five',
    title: 'Easily Prepare For Future Trips',
    text: 'Never forget what you\'ve brought on previous trips, past suitcases are just a tap away.',
    image: require('../Icons/assets/multipleSuitcases.json'),
    backgroundColor: '#22bcb5',
    width: 90,
  },
  {
    key: 'six',
    title: 'Ready To Go!',
    text: 'Enjoy easy access to your belongings and outfits anytime, anywhere.',
    image: require('../Icons/assets/backpackPacked.json'),
    backgroundColor: '#22bcb5',
    width: 90,
  },
];


    const _renderNextButton = () => {
        return (
            <View style={style.button}>
                <Text style={style.buttonText}>Next</Text>
            </View>
        );
    };

    const _renderDoneButton = () => {
        return (
            <View style={style.button}>
                <Text style={style.buttonText}>Let's Pack!</Text>
            </View>
        );
    };

    const _renderSkipButton = () => {
        return (
            <View style={style.button}>
                <Text style={style.buttonText}>Skip Demo</Text>
            </View>
        );
    };

    const _renderBackButton = () => {
        return (
            <View style={style.button}>
                <Text style={style.buttonText}>Back</Text>
            </View>
        );
    };

    const _renderItem = ({ item }: { item: Slide }) => {
        const widthPercentage = `${item.width}%`; 
        return (
            <View style={style.slide}>
                <View style={style.topView}>
                    <Text style={style.textTitle}>{item.title && item.title}</Text>
                    <Text style={style.text}>{item.text}</Text>
                    {item.text2 && <Text style={style.textSecondary}>{item.text2}</Text>}
                </View>
                {item.key === 'four' ? (
                    <View style={{ flex: 1, justifyContent: 'center', marginBottom: '20%' }}>
                        <View style={{ backgroundColor: colors.primary, width: '90%', height: '90%', alignSelf: 'center', padding: 30, borderRadius: 500 }}>
                            <LottieView style={{ width: widthPercentage, alignSelf: 'center' }} source={item.image} autoPlay loop />
                        </View>
                    </View>
                ) : (
                    <View style={{ flex: 1, justifyContent: 'center', marginBottom: '20%' }}>
                        <LottieView style={{ width: widthPercentage, alignSelf: 'center' }} source={item.image} autoPlay loop />
                    </View>
                )}
            </View>
        );
    };

    const _onDone = () => {
        setDemo(true);
    };

    return (
        <AppIntroSlider
            renderItem={_renderItem}
            data={slides}
            onDone={_onDone}
            renderDoneButton={_renderDoneButton}
            renderNextButton={_renderNextButton}
            renderSkipButton={_renderSkipButton}
            renderPrevButton={_renderBackButton}
            // bottomButton={true}
            showSkipButton
            activeDotStyle={{ backgroundColor: 'blue' }}
            showPrevButton
        />
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#2a334a',
    },
    slide: {
        flex: 1,
        paddingBottom: 40,
    },
    topView: {
        backgroundColor: colors.primary,
        height: '44%',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 10,
        paddingHorizontal: 30,
    },
    buttonText: {
        fontSize: 21,
        color: 'blue',
        textAlign: 'center',
    },
    normalImage: {
        height: '51%',
        width: '51%',
        alignSelf: 'center',
        borderRadius: 10,
    },
    largeImage: {
        height: '50%',
        width: '96%',
        alignSelf: 'center',
    },
    textTitle: {
        fontSize: 24,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 24,
        marginBottom: 20,
        fontWeight: '600',
        marginTop:'8%'
    },
    text: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 24,
        marginTop:'6%'
    },
    textSecondary: {
        fontSize: 20,
        fontFamily: 'Montserrat-Medium',
        lineHeight: 24,
    },
});
