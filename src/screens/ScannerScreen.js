import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CameraView, useCameraPermissions } from 'expo-camera';

const C = {
  bg: '#0A1628', bg2: '#111E35', bg3: '#1A2B47',
  red: '#E8263A', sky: '#5294C4',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
};

const BARCODE_MAP = {
  '3017620422003': 'Nutella',
  '3228857000166': 'Lait',
  '8076800105735': 'Pâtes Barilla',
  '7613035898523': 'Nesquik',
};

export default function ScannerScreen({ navigation }) {
  const [permission, requestPermission] = useCameraPermissions();
  const [scanned, setScanned] = useState(false);

  useEffect(() => { if (!permission?.granted) requestPermission(); }, []);

  const handleBarcode = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    const ingredient = BARCODE_MAP[data] || `Produit (${data.slice(-6)})`;
    Alert.alert('Produit scanné !', `Ajouter "${ingredient}" à votre frigo ?`, [
      { text: 'Annuler', style: 'cancel', onPress: () => setScanned(false) },
      { text: 'Ajouter', onPress: () => navigation.navigate('FridgeMain', { newIngredient: ingredient }) },
    ]);
  };

  if (!permission?.granted) return (
    <SafeAreaView style={[s.container, s.center]} edges={['top']}>
      <Text style={s.txt}>Permission caméra requise</Text>
      <TouchableOpacity style={s.btn} onPress={requestPermission}>
        <Text style={s.btnTxt}>Autoriser la caméra</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
        <Text style={{ color: C.sky, fontSize: 14, fontWeight: '700' }}>← Retour</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.backBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Scanner un produit</Text>
      </View>
      <View style={{ flex: 1 }}>
        <CameraView
          style={StyleSheet.absoluteFillObject}
          facing="back"
          onBarcodeScanned={scanned ? undefined : handleBarcode}
          barcodeScannerSettings={{ barcodeTypes: ['ean13', 'ean8', 'upc_a', 'qr'] }}
        />
        <View style={s.overlay}>
          <View style={s.frame}>
            <View style={[s.corner, s.tl]} /><View style={[s.corner, s.tr]} />
            <View style={[s.corner, s.bl]} /><View style={[s.corner, s.br]} />
          </View>
          <Text style={s.scanHint}>Placez le code-barres dans le cadre</Text>
        </View>
        {scanned && (
          <TouchableOpacity style={s.rescanBtn} onPress={() => setScanned(false)}>
            <Text style={s.rescanText}>Scanner à nouveau</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container: { flex: 1, backgroundColor: C.bg },
  center: { alignItems: 'center', justifyContent: 'center' },
  backBar: { backgroundColor: C.bg2, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 16 },
  backText: { color: C.sky, fontSize: 14, fontWeight: '700' },
  headerTitle: { color: C.white, fontSize: 15, fontWeight: '700' },
  txt: { color: C.muted, fontSize: 13, textAlign: 'center', marginBottom: 16 },
  btn: { backgroundColor: C.red, borderRadius: 22, paddingVertical: 12, paddingHorizontal: 24 },
  btnTxt: { color: C.white, fontSize: 14, fontWeight: '700' },
  overlay: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  frame: { width: 250, height: 250, position: 'relative' },
  corner: { position: 'absolute', width: 40, height: 40, borderColor: C.red, borderWidth: 3 },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0 },
  scanHint: { color: C.white, fontSize: 13, marginTop: 20, textAlign: 'center' },
  rescanBtn: { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: C.red, borderRadius: 22, paddingVertical: 12, paddingHorizontal: 24 },
  rescanText: { color: C.white, fontSize: 14, fontWeight: '700' },
});
