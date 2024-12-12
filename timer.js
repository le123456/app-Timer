import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';

export default function Timer(props) {
  const [sound, setSound] = useState();
  const [done, setDone] = useState(false);

  useEffect(() => {
    const tempo = setInterval(() => {
      props.setSegundos(props.segundos - 1);
      if (props.segundos <= 0) {
        if (props.minutos > 0) {
          props.setMinutos(props.minutos - 1);
          props.setSegundos(59);
        } else {
          if (!done) {
            setDone(true);
            props.setEstado('selecionando');
            props.setMinutos(0);
            props.setSegundos(1);
            playSound();
          }
        }
      }
    }, 1000);
    return () => clearInterval(tempo);
  }, [props.segundos, props.minutos, done]);

  function resetar() {
    setDone(false);
    props.setEstado('selecionando');
    props.setMinutos(0);
    props.setSegundos(1);
  }

  function formatarNumero(number) {
    return number < 10 ? '0' + number : number;
  }

  async function playSound() {
    const selectedSound = props.alarmSound.find((val) => val.selecionado);
    if (selectedSound) {
      const { sound } = await Audio.Sound.createAsync(selectedSound.file);
      setSound(sound);
      await sound.playAsync();
    }
  }

  const segundos = formatarNumero(props.segundos);
  const minutos = formatarNumero(props.minutos);

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row' }}>
        <Text style={styles.contador}>{minutos} : </Text>
        <Text style={styles.contador}>{segundos}</Text>
      </View>
      <TouchableOpacity onPress={() => resetar()} style={styles.btnStart}>
        <Text style={{ paddingTop: 33, fontWeight: 'bold', color: 'white' }}>Reiniciar</Text>
      </TouchableOpacity>
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
  contador: {
    color: 'white',
    fontSize: 40,
    fontWeight: 'bold',
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
});