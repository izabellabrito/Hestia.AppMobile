import 'react-native-gesture-handler';
import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// logon
import Main from './screens/Inicio';
import Login from './screens/Login';
import Cadastrar from './screens/Cadastre-se';
import EsqueciSenha from './screens/EsqueciSenha';

// solicitar pedido
import NovoPedido from './screens/Pedido/NovoPedido';
import Items from './screens/Pedido/Items';
import Revisao from './screens/Pedido/Revisao';
import BuscandoPrestador from './screens/Pedido/BuscandoPrestador';
import PedidoAceito from './screens/Pedido/PedidoAceito';
import Pagamento from './screens/Pedido/Pagamento';
import NovoCartao from './screens/Pedido/NovoCartao';

// entrega delivery
import BuscandoEntregador from './screens/Pedido/BuscandoEntregador';
import EntregaDelivery from './screens/Pedido/Delivery/Entrega';
import RetiradaDelivery from './screens/Pedido/Delivery/Retirada';

// entrega diretamente
import EntregaDiretamente from './screens/Pedido/EntregaDiretamente/Entrega';
import RetiradaDiretamente from './screens/Pedido/EntregaDiretamente/Retirada';

import Andamento from './screens/Pedido/Andamento';
import Avaliacao from './screens/Pedido/Avaliacao';

// pedidos
import PedidosAndamento from './screens/PedidoAndamentos/Andamento';
import PedidosFinalizados from './screens/PedidoAndamentos/Finalizado';
import ResumoPedido from './screens/PedidoAndamentos/Resumo';

// outros
import Home from './screens/Home';
import Perfil from './screens/Dados/Perfil';
import DadosPessoais from './screens/Dados/DadosPessoais';

// cartoes
import Cartoes from './screens/Dados/Cartoes';
import CadastrarCartao from './screens/Dados/CadastrarCartao';
import DetalheCartao from './screens/Dados/DetalheCartao';

const Stack = createStackNavigator();
const BottomTab = createBottomTabNavigator();
const TopTab = createMaterialTopTabNavigator();

function HomeBottomNavigation() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="Home"
				component={Home}
				options={{
					tabBarLabel: 'Inicio',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="home" color={color} size={26} />,
				}}
			/>
			<BottomTab.Screen
				name="Pedidos"
				component={PedidosTab}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="bookmark" color={color} size={26} />,
				}}
			/>
			<BottomTab.Screen
				name="Perfil"
				component={Perfil}
				options={{
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="account" color={color} size={26} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function RotaEntregaBottomNavigation() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="MapaEntrega"
				component={EntregaDiretamente}
				options={{
					tabBarLabel: 'Rota',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" color={color} size={26} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function RotaRetiradaBottomNavigation() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="MapaRetirada"
				component={RetiradaDiretamente}
				options={{
					tabBarLabel: 'Rota',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" color={color} size={26} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function DeliveryEntregaBottomNavigation() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="DeliveryEntrega"
				component={EntregaDelivery}
				options={{
					tabBarLabel: 'Rota',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" color={color} size={26} />,
				}}
			/>
			{/* <BottomTab.Screen name="Home" component={Home} /> */}
		</BottomTab.Navigator>
	);
}

function DeliveryRetiradaBottomNavigation() {
	return (
		<BottomTab.Navigator>
			<BottomTab.Screen
				name="DeliveryRetirada"
				component={RetiradaDelivery}
				options={{
					tabBarLabel: 'Rota',
					tabBarIcon: ({ color }) => <MaterialCommunityIcons name="map" color={color} size={26} />,
				}}
			/>
		</BottomTab.Navigator>
	);
}

function PedidosTab() {
	return (
		<TopTab.Navigator
			tabBarOptions={{
				tabStyle: { marginTop: 25 },
			}}
		>
			<TopTab.Screen name="Finalizados" component={PedidosFinalizados} />
			<TopTab.Screen
				name="PedidosAndamento"
				component={PedidosAndamento}
				options={{
					tabBarLabel: 'Em andamento',
				}}
			/>
		</TopTab.Navigator>
	);
}

export default function Routes() {
	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="Inicio">
				<Stack.Screen
					name="Inicio"
					component={Main}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen name="Entrar" component={Login} />
				<Stack.Screen name="Cadastrar" component={Cadastrar} />
				<Stack.Screen
					name="Home"
					component={HomeBottomNavigation}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="NovoPedido"
					component={NovoPedido}
					options={{
						headerTitle: 'Novo pedido',
					}}
				/>
				<Stack.Screen
					name="Items"
					component={Items}
					options={{
						headerTitle: 'Itens',
					}}
				/>
				<Stack.Screen name="Revisao" component={Revisao} />
				<Stack.Screen
					name="BuscandoEntregador"
					component={BuscandoEntregador}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="BuscandoPrestador"
					component={BuscandoPrestador}
					options={{
						headerShown: false,
					}}
				/>
				<Stack.Screen
					name="EntregaDelivery"
					component={EntregaDelivery}
					options={{
						headerTitle: 'Entrega',
					}}
				/>
				<Stack.Screen
					name="RetiradaDelivery"
					component={RetiradaDelivery}
					options={{
						headerTitle: 'Retirada',
					}}
				/>
				<Stack.Screen
					name="PedidoAceito"
					component={PedidoAceito}
					options={{
						headerTitle: 'Confirmação',
						headerBackTitleVisible: false,
						headerRight: null,
						headerLeft: null,
					}}
				/>
				<Stack.Screen name="Pagamento" component={Pagamento} />
				<Stack.Screen
					name="RotaEntrega"
					component={EntregaDiretamente}
					options={{
						headerTitle: 'Entrega',
					}}
				/>
				<Stack.Screen
					name="RotaRetirada"
					component={RetiradaDiretamente}
					options={{
						headerTitle: 'Retirada',
					}}
				/>
				<Stack.Screen
					name="Andamento"
					component={Andamento}
					options={{
						headerBackTitleVisible: false,
						headerRight: null,
						headerLeft: null,
					}}
				/>
				<Stack.Screen
					name="Avaliacao"
					component={Avaliacao}
					options={{
						headerTitle: 'Feedback',
						headerBackTitleVisible: false,
						headerRight: null,
						headerLeft: null,
					}}
				/>
				<Stack.Screen
					name="CadastrarCartao"
					component={CadastrarCartao}
					options={{
						headerTitle: 'Novo cartão',
					}}
				/>
				<Stack.Screen
					name="NovoCartao"
					component={NovoCartao}
					options={{
						headerTitle: 'Novo cartão',
					}}
				/>
				<Stack.Screen
					name="EsqueciSenha"
					component={EsqueciSenha}
					options={{
						headerTitle: 'Esqueci minha Senha',
					}}
				/>
				<Stack.Screen
					name="Cartoes"
					component={Cartoes}
					options={{
						headerTitle: 'Meus cartões',
					}}
				/>
				<Stack.Screen
					name="ResumoPedido"
					component={ResumoPedido}
					options={{
						headerTitle: 'Resumo',
						headerBackTitle: 'Inicio',
					}}
				/>
				<Stack.Screen
					name="DetalheCartao"
					component={DetalheCartao}
					options={{
						headerTitle: 'Detalhes',
					}}
				/>
				<Stack.Screen
					name="DadosPessoais"
					component={DadosPessoais}
					options={{
						headerTitle: 'Dados pessoais',
					}}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}
