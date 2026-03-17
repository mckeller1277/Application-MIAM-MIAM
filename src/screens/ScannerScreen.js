import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { BarCodeScanner } from 'expo-barcode-scanner';

const C = {
  bg: '#0A1628', bg2: '#111E35',
  red: '#E8263A', sky: '#5294C4',
  text: '#E8F0FB', muted: '#7A99BB', white: '#FFFFFF',
};

const BARCODE_MAP = {
  '3017620422003': 'Nutella',
  '3228857000166': 'Lait',
  '8076800105735': 'Pâtes',
  '7613035898523': 'Nesquik',
  '3175680011534': 'Yaourt',
  '3270160513100': 'Crème fraîche',
};

export default function ScannerScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    BarCodeScanner.requestPermissionsAsync().then(({ status }) => {
      setHasPermission(status === 'granted');
    });
  }, []);

  const handleBarcode = ({ data }) => {
    if (scanned) return;
    setScanned(true);
    const ingredient = BARCODE_MAP[data] || 'Produit scanné';
    Alert.alert(
      '✅ Produit scanné !',
      `Ajouter "${ingredient}" à votre frigo ?`,
      [
        { text: 'Annuler', style: 'cancel', onPress: () => setScanned(false) },
        { text: 'Ajouter ✓', onPress: () => navigation.navigate('FridgeMain', { newIngredient: ingredient }) },
      ]
    );
  };

  if (hasPermission === null) {
    return (
      <SafeAreaView style={[s.container, s.center]} edges={['top']}>
        <Text style={s.permText}>Demande de permission...</Text>
      </SafeAreaView>
    );
  }

  if (hasPermission === false) {
    return (
      <SafeAreaView style={[s.container, s.center]} edges={['top']}>
        <Text style={{ fontSize: 48, marginBottom: 16 }}>📷</Text>
        <Text style={s.permText}>L'accès à la caméra est nécessaire{'\n'}pour scanner les codes-barres.</Text>
        <TouchableOpacity style={s.permBtn} onPress={() => BarCodeScanner.requestPermissionsAsync().then(({ status }) => setHasPermission(status === 'granted'))}>
          <Text style={s.permBtnText}>Autoriser la caméra</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginTop: 16 }}>
          <Text style={{ color: C.sky, fontSize: 14, fontWeight: '700' }}>← Retour</Text>
        </TouchableOpacity>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={s.container} edges={['top']}>
      <View style={s.backBar}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={s.backText}>← Retour</Text>
        </TouchableOpacity>
        <Text style={s.headerTitle}>Scanner un produit</Text>
      </View>

      <View style={{ flex: 1 }}>
        <BarCodeScanner
          onBarCodeScanned={scanned ? undefined : handleBarcode}
          style={StyleSheet.absoluteFillObject}
        />

        <View style={s.overlay}>
          <Text style={s.scanLabel}>Scanner un code-barres</Text>
          <View style={s.frame}>
            <View style={[s.corner, s.tl]} />
            <View style={[s.corner, s.tr]} />
            <View style={[s.corner, s.bl]} />
            <View style={[s.corner, s.br]} />
          </View>
          <Text style={s.scanHint}>Placez le code-barres dans le cadre</Text>
        </View>

        {scanned && (
          <TouchableOpacity style={s.rescanBtn} onPress={() => setScanned(false)}>
            <Text style={s.rescanText}>🔄 Scanner à nouveau</Text>
          </TouchableOpacity>
        )}
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  container:   { flex: 1, backgroundColor: C.bg },
  center:      { alignItems: 'center', justifyContent: 'center' },
  backBar:     { backgroundColor: C.bg2, paddingHorizontal: 16, paddingVertical: 12, flexDirection: 'row', alignItems: 'center', gap: 16 },
  backText:    { color: C.sky, fontSize: 14, fontWeight: '700' },
  headerTitle: { color: C.white, fontSize: 15, fontWeight: '700' },
  permText:    { color: C.muted, fontSize: 13, textAlign: 'center', lineHeight: 20, marginBottom: 20 },
  permBtn:     { backgroundColor: C.red, borderRadius: 22, paddingVertical: 12, paddingHorizontal: 24 },
  permBtnText: { color: C.white, fontSize: 14, fontWeight: '700' },
  overlay:     { flex: 1, alignItems: 'center', justifyContent: 'center' },
  scanLabel:   { color: C.white, fontSize: 16, fontWeight: '700', marginBottom: 20, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 4 },
  frame:       { width: 260, height: 260, position: 'relative' },
  corner:      { position: 'absolute', width: 44, height: 44, borderColor: C.red, borderWidth: 4 },
  tl: { top: 0, left: 0, borderRightWidth: 0, borderBottomWidth: 0, borderTopLeftRadius: 8 },
  tr: { top: 0, right: 0, borderLeftWidth: 0, borderBottomWidth: 0, borderTopRightRadius: 8 },
  bl: { bottom: 0, left: 0, borderRightWidth: 0, borderTopWidth: 0, borderBottomLeftRadius: 8 },
  br: { bottom: 0, right: 0, borderLeftWidth: 0, borderTopWidth: 0, borderBottomRightRadius: 8 },
  scanHint:    { color: C.white, fontSize: 13, marginTop: 20, textShadowColor: 'rgba(0,0,0,0.8)', textShadowRadius: 4 },
  rescanBtn:   { position: 'absolute', bottom: 40, alignSelf: 'center', backgroundColor: C.red, borderRadius: 22, paddingVertical: 12, paddingHorizontal: 24 },
  rescanText:  { color: C.white, fontSize: 14, fontWeight: '700' },
});
