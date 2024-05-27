import React, { useState } from "react";
import { Body, Body2, Circular, Input, InputView, Button, ButtonText, BackButton, Text, Icones } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { launchImageLibrary } from 'react-native-image-picker';
import { Image, StyleSheet, Alert } from "react-native";

const Comodidade = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);

    const handleImagePicker = () => {
        const options = {
            mediaType: 'photo',
            quality: 1,
        };

        launchImageLibrary(options, (response) => {
            if (response.didCancel) {
                console.log('User cancelled image picker');
            } else if (response.errorCode) {
                console.log('ImagePicker Error: ', response.errorCode);
                Alert.alert('Erro ao selecionar imagem', response.errorMessage);
            } else if (response.assets && response.assets.length > 0) {
                setImageUri(response.assets[0].uri);
            }
        });
    };

    return (
        <>
            <Body>
                <BackButton onPress={() => navigation.goBack()}>
                    <Icones name="angle-left" size={25} style={{ position: 'absolute', left: 17, top: 4, color: '#35B6B4' }} />
                </BackButton>
            </Body>
            <Body2>
                <Circular onPress={handleImagePicker}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <Icones name="camera" size={37} color="#00345C" />
                    )}
                </Circular>
                <Text style={{ position: 'absolute', top: 100, color: Colors.black }}>Escreve os escropo do seu comodidade</Text>
                <InputView>
                    <Input placeholder="Titulo" />
                    <Input placeholder="Descricão" />
                    <Input placeholder="Email de Contato" />
                </InputView>
                <Button>
                    <ButtonText>Cadastrar</ButtonText>
                </Button>
            </Body2>
        </>
    );
}

const styles = StyleSheet.create({
    image: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },
});

export default Comodidade;
