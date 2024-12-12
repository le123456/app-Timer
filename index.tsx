import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import TimerSelector from './timeSelector';
import Timer from './timer';

export default function App() {
  const [segundos, setSegundos] = useState(1);
  const [minutos, setMinutos] = useState(0);
  const [estado, setEstado] = useState('selecionando');
  const [alarmSound, setAlarmSound] = useState([
    {
      id: 1,
      selecionado: true,
      som: 'alarme 1',
      file: require('../assets/alarme1.mp3'),
    },
    {
      id: 2,
      selecionado: false,
      som: 'alarme 2',
      file: require('../assets/alarme2.mp3'),
    },
  ]);

  const numeros = Array.from({ length: 60 }, (_, i) => i + 1);

  const handleSetAlarm = (id:number) => {
    const updatedAlarmSound = alarmSound.map((alarm) =>
      alarm.id === id ? { ...alarm, selecionado: true } : { ...alarm, selecionado: false }
    );
    setAlarmSound(updatedAlarmSound);
  };

  return (
    <View style={styles.container}>
      {estado === 'selecionando' ? (
        <TimerSelector
          minutos={minutos}
          setMinutos={setMinutos}
          segundos={segundos}
          setSegundos={setSegundos}
          numeros={numeros}
          alarmSound={alarmSound}
          setAlarm={handleSetAlarm}
          estado={estado}
          setEstado={setEstado}
        />
      ) : (
        <Timer
          minutos={minutos}
          setMinutos={setMinutos}
          segundos={segundos}
          setSegundos={setSegundos}
          numeros={numeros}
          alarmSound={alarmSound}
          setAlarm={handleSetAlarm}
          estado={estado}
          setEstado={setEstado}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(80, 50, 168)',
    alignItems: 'center',
    justifyContent: 'center',
  },
});