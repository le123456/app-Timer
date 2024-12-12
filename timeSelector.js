// TimerSelector.js
import React from 'react';
import { View, Text, Picker, TouchableOpacity, StyleSheet } from 'react-native';

const TimerSelector = ({
  minutos,
  setMinutos,
  segundos,
  setSegundos,
  numeros,
  alarmSound,
  setAlarm,
  estado,
  setEstado,
}) => {
  const handleMinutosChange = (value) => {
    setMinutos(value);
  };

  const handleSegundosChange = (value) => {
    setSegundos(value);
  };

  const handleAlarmChange = (id) => {
    setAlarm(id);
  };

  const handleStartPress = () => {
    setEstado('iniciar');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Selecione o seu Tempo:</Text>

      <View style={styles.row}>
        <Text style={styles.label}>Min:</Text>
        <Picker
          selectedValue={minutos}
          onValueChange={handleMinutosChange}
          style={styles.picker}
        >
          {numeros.map((val) => (
            <Picker.Item key={val} label={val.toString()} value={val.toString()} />
          ))}
        </Picker>

        <Text style={styles.label}>Seg:</Text>
        <Picker
          selectedValue={segundos}
          onValueChange={handleSegundosChange}
          style={styles.picker}
        >
          {numeros.map((val) => (
            <Picker.Item key={val} label={val.toString()} value={val.toString()} />
          ))}
        </Picker>
      </View>

      <View style={styles.alarmRow}>
        {alarmSound.map((val) => (
          <TouchableOpacity
            key={val.som}
            onPress={() => handleAlarmChange(val.id)}
            style={val.selecionado ? styles.btnChooseSel : styles.btnChoose}
          >
            <Text style={styles.btnText}>{val.som}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <TouchableOpacity onPress={handleStartPress} style={styles.btnStart}>
        <Text style={{ paddingTop: 33, fontWeight: 'bold', color: 'white' }}>
          Iniciar
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    alignItems: 'center',
  },
  title: {
    color: 'white',
    fontSize: 24,
    marginBottom: 10,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    color: 'white',
    fontSize: 16,
    marginHorizontal: 5,
  },
  picker: {
    height: 50,
    width: 100,
    backgroundColor: 'transparent',
    color: 'white',
  },
  alarmRow: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  btnChoose: {
    backgroundColor: '#4CAF50',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  btnStart: {
    backgroundColor: 'rgb(116, 67, 191)',
    width: 100,
    height: 100,
    borderRadius: 50,
    marginTop: 30,
    borderColor: 'white',
    borderWidth: 4,
    alignItems: 'center',
  },
  btnChooseSel: {
    backgroundColor: '#FFA500',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginHorizontal: 5,
  },
  btnText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default TimerSelector;
