import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { AuthProvider } from './contexts/AuthContext';
import Load from './pages/Load';
import Auth from './pages/Auth';
import Register from './pages/Register';
import Feed from './pages/Feed';
import Menu from './pages/Menu';
import MenuRegister from './pages/MenuResgister';
import Suporte from './pages/Suporte';
import Aviso from './pages/Post/Aviso';
import Eventos from './pages/Post/Eventos';
import Comodidade from './pages/Post/Comodidade';
import Atletica from './pages/Post/Atletica';
import Detail from './pages/Detail';
import Edit from './pages/Edit';
import Admin from './pages/Admin';


const Stack = createStackNavigator();

function App() {
  return (
    <AuthProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Load">
          <Stack.Screen name="Load" component={Load} options={{ headerShown: false }} />
          <Stack.Screen name="Auth" component={Auth} options={{ headerShown: false }} />
          <Stack.Screen name="Register" component={Register} options={{ headerShown: false }} />
          <Stack.Screen name="Feed" component={Feed} options={{ headerShown: false }} />
          <Stack.Screen name="MenuResgister" component={MenuRegister} options={{ headerShown: false }} />
          <Stack.Screen name="Menu" component={Menu} options={{ headerShown: false }} />
          <Stack.Screen name="Suporte" component={Suporte} options={{ headerShown: false }} />
          <Stack.Screen name="Aviso" component={Aviso} options={{ headerShown: false }} />
          <Stack.Screen name="Eventos" component={Eventos} options={{ headerShown: false }} />
          <Stack.Screen name="Comodidade" component={Comodidade} options={{ headerShown: false }} />
          <Stack.Screen name="Atletica" component={Atletica} options={{ headerShown: false }} />
          <Stack.Screen name="Detail" component={Detail} options={{ headerShown: false }} />
          <Stack.Screen name="Edit" component={Edit} options={{ headerShown: false }} />
          <Stack.Screen name="Admin" component={Admin} options={{ headerShown: false }} />
        </Stack.Navigator>
      </NavigationContainer>
    </AuthProvider>
  );
}

export default App;
