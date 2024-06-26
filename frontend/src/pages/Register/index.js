import React, { useState } from "react";
import { View } from "react-native";
import { Body, Body2, Circular, Input, InputView, CameraIcon, Button, ButtonText, BackButton, Text } from "./styles";
import { useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from 'react-native-image-picker';
import Toast, { BaseToast } from 'react-native-toast-message';
import { Image, Alert, StyleSheet, TouchableOpacity } from "react-native";
import api from '../../api/api'; 

const Register = () => {
    const navigation = useNavigation();
    const [imageUri, setImageUri] = useState(null);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const toastConfig = {
        error: ({ text1, text2 }) => (
          <BaseToast
            {...{ text1, text2 }}
            style={{ backgroundColor: '#fff', borderLeftColor: 'red' }}
            textStyle={{ color: '#909090' }}
          />
        ),
      };

    const toastFill = () => {
        Toast.show({
          type: "error",
          text1: "Preencha todos os campos.",
          text2: "Tente novamente!",
          autoHide: true,
          visibilityTime: 2500,
        })
      }
    
    const toastError = () => {
        Toast.show({
          type: "error",
          text1: "Erro ao cadastrar usuário.",
          text2: "Tente novamente mais tarde.",
          autoHide: true,
          visibilityTime: 2500,
        })
      }
    
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

    const handleRegister = async () => {
        if (!name || !email || !password) {
            toastFill();
            return;
        }

        const formData = new FormData();
        formData.append('username', name);
        formData.append('email', email);
        formData.append('password', password);
        formData.append('role', 'aluno');

        if (imageUri) {
            const uriParts = imageUri.split('.');
            const fileType = uriParts[uriParts.length - 1];

            formData.append('foto', {
                uri: imageUri,
                type: `image/${fileType}`,
                name: `photo.${fileType}`,
            });
        }

        try {
            const response = await api.post('/addUser', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                }
            });
            console.log('Resposta da API:', response.data);
            navigation.navigate('Auth');
        } catch (error) {
            console.error('Erro na API:', error);
            toastError();
        }
    };

    return (
        <>  
            <View style={{ zIndex: 9999 }}>
                <Toast config={toastConfig} />
            </View>
            <Body />
            <Body2>
                <Circular onPress={handleImagePicker}>
                    {imageUri ? (
                        <Image source={{ uri: imageUri }} style={styles.image} />
                    ) : (
                        <CameraIcon name="camera" size={37} color="#00345C" />
                    )}
                </Circular>
                <InputView>
                    <Text style={{ textAlign: 'center', width: 350 }}>
                        Faça o seu cadastro, para compartilhar suas experiências
                    </Text>
                    <Input
                        placeholder="Nome"
                        placeholderTextColor="#626262"
                        value={name}
                        onChangeText={setName}
                    />
                    <Input
                        placeholder="Email"
                        placeholderTextColor="#626262"
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Input
                        placeholder="Senha"
                        placeholderTextColor="#626262"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                    />
                </InputView>
                <Button onPress={handleRegister}>
                    <ButtonText>Cadastrar</ButtonText>
                </Button>
                <BackButton>
                    <TouchableOpacity onPress={() => navigation.navigate('Auth')}>
                        <Text>Voltar?</Text>
                    </TouchableOpacity>
                </BackButton>
            </Body2>
        </>
    );
};

const styles = StyleSheet.create({
    image: {
        width: 150,
        height: 150,
        borderRadius: 100,
    },
});

export default Register;
