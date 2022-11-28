import React, { useState } from 'react';
import { Alert, Image, ImageBackground, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import LogoutButton from './LogOutButton';


const MainPage = () => {
    const [image, setImage] = useState(null);
    const [images, setImages] = useState(null);

    const pickSingleWithCamera = (cropping, mediaType = 'photo') => {
        ImagePicker.openCamera({
            cropping: cropping,
            width: 500,
            height: 500,
            includeExif: true,
            mediaType,
        })
            .then((image) => {
                console.log('received image', image);
                setImage({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                })
                setImages(null)
            })
            .catch((e) => alert(e));
    }

    const pickSingle = (cropit, circular = false, mediaType) => {
        ImagePicker.openPicker({
            width: 500,
            height: 500,
            cropping: cropit,
            cropperCircleOverlay: circular,
            sortOrder: 'none',
            compressImageMaxWidth: 1000,
            compressImageMaxHeight: 1000,
            compressImageQuality: 1,
            compressVideoPreset: 'MediumQuality',
            includeExif: true,
            cropperStatusBarColor: 'white',
            cropperToolbarColor: 'white',
            cropperActiveWidgetColor: 'white',
            cropperToolbarWidgetColor: '#3498DB',
        })
            .then((image) => {
                console.log('received image', image);
                setImage({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                });
                setImages(null);
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    }

    const cropLast = () => {
        if (!image) {
            return Alert.alert(
                'No image',
                'Before open cropping only, please select image'
            );
        }

        ImagePicker.openCropper({
            path: image.uri,
            width: 200,
            height: 200,
        })
            .then((image) => {
                console.log('received cropped image', image);
                setImage({
                    uri: image.path,
                    width: image.width,
                    height: image.height,
                    mime: image.mime,
                })
                setImages(null)
            })
            .catch((e) => {
                console.log(e);
                Alert.alert(e.message ? e.message : e);
            });
    }



    const pickMultiple = () => {
        ImagePicker.openPicker({
            multiple: true,
            waitAnimationEnd: false,
            sortOrder: 'desc',
            includeExif: true,
            forceJpg: true,
        })
            .then((images) => {
                setImage(null)
                setImages(
                    images.map((i) => {
                        console.log('received image', i);
                        return {
                            uri: i.path,
                            width: i.width,
                            height: i.height,
                            mime: i.mime,
                        };
                    })
                )
            })
            .catch((e) => alert(e));
    }

    const cleanupImages = () => {
        ImagePicker.clean()
            .then(() => {
                console.log('removed tmp images from tmp directory');
                setImages(null)
                setImage(null)
            })
            .catch((e) => {
                alert(e);
            });
    }

    const cleanupSingleImage = () => {
        let img = image || (images && images.length ? images[0] : null);
        console.log('will cleanup image', img);

        ImagePicker.cleanSingle(img ? img.uri : null)
            .then(() => {
                console.log(`removed tmp image ${img.uri} from tmp directory`);
                setImage(null)
            })
            .catch((e) => {
                alert(e);
            });
    }

    // const renderVideo = (video) => {
    //   console.log('rendering video');
    //   return (
    //     <View style={{ height: 300, width: 300 }}>
    //       <Video
    //         source={{ uri: video.uri, type: video.mime }}
    //         style={{ position: 'absolute', top: 0, left: 0, bottom: 0, right: 0 }}
    //         rate={1}
    //         paused={false}
    //         volume={1}
    //         muted={false}
    //         resizeMode={'cover'}
    //         onError={(e) => console.log(e)}
    //         onLoad={(load) => console.log(load)}
    //         repeat={true}
    //       />
    //     </View>
    //   );
    // }

    const renderAsset = (image) => {
        // if (image.mime && image.mime.toLowerCase().indexOf('video/') !== -1) {
        //   return renderVideo(image);
        // }

        return renderImage(image);
    }

    const renderImage = (image) => {
        return (
            <Image
                style={{ width: 300, height: 300, resizeMode: 'contain' }}
                source={image}
            />
        );
    }

    return (
        <View style={styles.container}>
            <ScrollView>
                {image ? renderAsset(image) : null}
                {images
                    ? images.map((i) => (
                        <View key={i.uri}>{renderAsset(i)}</View>
                    ))
                    : null}
            </ScrollView>

            <TouchableOpacity
                onPress={() => pickSingleWithCamera(false)}
                style={styles.button}
            >
                <Text style={styles.text}>Select single image with camera</Text>
            </TouchableOpacity>

            {/* <TouchableOpacity
        onPress={() =>
          pickSingleWithCamera(false, (mediaType = 'video'))
        }
        style={style.button}
      >
        <Text style={style.text}>Select Single Video With Camera</Text>
      </TouchableOpacity> */}

            <TouchableOpacity
                onPress={() => pickSingleWithCamera(true)}
                style={styles.button}
            >
                <Text style={styles.text}>
                    Select Single With camera with cropping
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={() => pickSingle(false)}
                style={styles.button}
            >
                <Text style={styles.text}>Select single</Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => cropLast()} style={styles.button}>
                <Text style={styles.text}>Crop last selected image</Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={() => pickSingle(true)}
                style={styles.button}
            >
                <Text style={styles.text}>Select single with cropping</Text>
            </TouchableOpacity>


            <TouchableOpacity
                onPress={pickMultiple}
                style={styles.button}
            >
                <Text style={styles.text}>Select multiple</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={cleanupImages}
                style={styles.button}
            >
                <Text style={styles.text}>Cleanup all images</Text>
            </TouchableOpacity>

            <TouchableOpacity
                onPress={cleanupSingleImage}
                style={styles.button}
            >
                <Text style={styles.text}>Cleanup single image</Text>
            </TouchableOpacity>

        </View>

    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#C0C0C0',
        height: '100%'
    },
    button: {
        backgroundColor: "#008dc1",
        marginBottom: 10,
        borderRadius: 50,
        paddingVertical: 1,
        width: '80%',
    },
    text: {
        color: '#ffffff',
        fontSize: 17,
        textAlign: 'center',
    },
});



export default MainPage;