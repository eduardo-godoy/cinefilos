import { StyleSheet, Text, View, Image,Pressable } from 'react-native';
import { useState } from 'react';
import { colors } from '../global/colors'
import { useDispatch, useSelector } from 'react-redux';
import { setCameraImage } from '../features/User/UserSlice';
import { useGetProfileimageQuery, usePostProfileImageMutation } from '../services/shopServices';
import * as ImagePicker from 'expo-image-picker';
import AddButton from '../components/AddButton';

export default function ImageSelector ({ navigation }) {

  const [image, setImage] = useState(null);
  const [isImageFromCamera, setIsImageFromCamera] = useState(false);
  const dispatch = useDispatch();
  const [triggerPostImage, result] = usePostProfileImageMutation();
  const { localId } = useSelector((state) => state.auth.value);
  const { data: imageFromBase, error, isLoading } = useGetProfileimageQuery(localId);
  

    const pickLibraryImage = async () => {
      try {
        setIsImageFromCamera(false)
          const permissionGallery = await verifyGalleryPermissions();
          if (permissionGallery) {
            const result = await ImagePicker.launchImageLibraryAsync({
              base64: true,
              allowsEditing: true,
              aspect: [1,1],
              mediaTypes: ImagePicker.MediaTypeOptions.Images,
              quality: 0.2,
          });
          if (!result.canceled){
            const image = `data:image/jpeg;base64,${result.assets[0].base64}`
            setImage(image)
          }
        }
      } catch (error) {
          console.log(error)
      }
    };

    const verifyGalleryPermissions = async () => {
      const { granted } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      return granted;
    };

    const verifyCameraPermisson = async () => {
      const { granted } = await ImagePicker.requestCameraPermissionsAsync();
      if (!granted) {
        return false;
      }
      return true;
    };

  const pickImage = async () => {
    const isCameraOk = await verifyCameraPermisson()
    if (isCameraOk) {
      let result = await ImagePicker.launchCameraAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [1, 1],
        base64: true,
        quality: 0.2,
      });
      if (!result.canceled) {
        setImage(`data:image/jpeg;base64,${result.assets[0].base64}`);
      }
    }
  };

  const atras = () => {
    navigation.goBack();
  }

  const confirmImage = async () => {
    try {
      dispatch(setCameraImage(image));
      triggerPostImage({ image, localId });
      if (isImageFromCamera) {
        ExpoLibrary.createAssetAsync(imageURI);
      }
      navigation.goBack();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <View style={styles.container}>
      {image || imageFromBase ? (
        <>
          <Image
            style={styles.img}
            resizeMode="cover"
            source={{ uri: image || imageFromBase?.image }}
          />
          <AddButton title="Tomar otra foto" onPress={pickImage} />

          <AddButton
            title="Elegir otra foto"
            onPress={pickLibraryImage}
          />
          

        { imageFromBase ? (<AddButton title="Eliminar Foto" onPress={confirmImage} /> ):( <AddButton title="Confirmar" onPress={confirmImage} /> ) }
        <AddButton title="Atras" onPress={atras} />
        </>
      ) : (
        <>
          <View style={styles.containerPhoto}>
            <Text>Sin foto...</Text>
          </View>
          <AddButton title="Tomar foto" onPress={pickImage} />
          <AddButton
            title="Elegir foto de la galeria"
            onPress={pickLibraryImage}
          />
          <AddButton title="Atras" onPress={atras} />
        </>
        
      )}
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center'
  },
  btn: {
    marginTop: 10,
    backgroundColor: colors.green700,
    width: "80%",
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 7,
    borderRadius: 5
  },
  img: {
    marginVertical: 20,
    height: 200,
    width: 200,
    borderRadius: 100
  },
  containerPhoto: {
    marginVertical: 20,
    height: 200,
    width: 200,
    borderRadius: 100,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
