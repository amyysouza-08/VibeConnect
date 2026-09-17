import React from "react";
import { View, ActivityIndicator } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import {
  useFonts,
  Poppins_400Regular,
  Poppins_500Medium,
  Poppins_600SemiBold,
  Poppins_700Bold,
} from "@expo-google-fonts/poppins";

import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

// TELAS
import Publicacao from "./components/publicacao/Publicacao";
import CriarPublicacao from "./components/criarpublicacao/CriarPublicacao";
import Home from "./components/home/Home";
import Login from "./components/login/Login";

import CriarConta from "./components/CriarConta/criarConta";
import EditarPerfil from "./components/EditarPerfil/editarPerfil";
import Perfil from "./components/Perfil/perfil";
import Notificacao from "./components/Notificacao/Notificacao";

const Stack = createNativeStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    Poppins_400Regular,
    Poppins_500Medium,
    Poppins_600SemiBold,
    Poppins_700Bold,
  });

  if (!fontsLoaded) {
    return (
      <SafeAreaProvider>
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <ActivityIndicator />
        </View>
      </SafeAreaProvider>
    );
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{
            headerShown: false,
          }}
        >

          {/* LOGIN - PRIMEIRA TELA */}
          <Stack.Screen
            name="Login"
            component={Login}
          />

          {/* FEED / HOME */}
          <Stack.Screen
            name="Home"
            component={Home}
          />

          {/* CRIAR CONTA */}
          <Stack.Screen
            name="CriarConta"
            component={CriarConta}
          />

          {/* CRIAR PUBLICAÇÃO */}
          <Stack.Screen
            name="CriarPublicacao"
            component={CriarPublicacao}
          />

          {/* NOTIFICAÇÕES */}
          <Stack.Screen
            name="Notificacao"
            component={Notificacao}
          />

          {/* PERFIL */}
          <Stack.Screen
            name="Perfil"
            component={Perfil}
          />

          {/* PUBLICAÇÃO */}
          <Stack.Screen
            name="Publicacao"
            component={Publicacao}
          />

          {/* EDITAR PERFIL */}
          <Stack.Screen
            name="EditarPerfil"
            component={EditarPerfil}
          />

        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}