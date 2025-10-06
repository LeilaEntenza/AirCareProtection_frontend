import SendSMS from 'react-native-sms';
  async function requestSMSPermission() {
    try {
        const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.SEND_SMS,
        {
            title: 'Permiso para enviar SMS',
            message: 'La app necesita permiso para enviar mensajes de texto',
            buttonPositive: 'Aceptar',
        },
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert('Permiso denegado para enviar SMS');
        return false;
        }
        return true;
    } catch (err) {
        console.warn(err);
        return false;
    }
}
  
export async function enviarSMS() {
    const hasPermission = await requestSMSPermission();
    if (!hasPermission) return;

    SendSMS.send({
        body: 'Mensaje automático desde mi app',
        recipients: ['+549112517550'],
        successTypes: ['sent', 'queued'],
        allowAndroidSendWithoutReadPermission: true,
    }, (completed, cancelled, error) => {
        if (completed) Alert.alert('SMS enviado correctamente');
        else if (cancelled) Alert.alert('SMS cancelado');
        else if (error) Alert.alert('Error al enviar SMS', error.message);
    });
}
