import React, { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import { Container, Item, ItemWrap, Botao, Total } from './styles';
import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

export default function Revisao({ navigation, route }) {
	const [total, setTotal] = useState(0);

	function somarItems() {
		let soma = 0;
		route.params.selecionados.forEach((item) => {
			let totalItem = item.valor * item.quantidade;
			soma = totalItem + soma;
		});
		setTotal(soma);
	}

	useEffect(() => {
		somarItems();
	}, []);

	return (
		<Container>
			<CustomText color={colors.cinza} fontSize="17px" type="bold" align="center" marginTop="15px">
				Confira os itens e o valor total do seu pedido abaixo:
			</CustomText>

			<FlatList
				style={{ marginTop: 10 }}
				data={route.params?.selecionados}
				renderItem={({ item }) => <ItemLista item={item} />}
				keyExtractor={(item) => item.id}
			/>

			<Total>
				<CustomText color={colors.cinza} fontSize="17px" type="semiBold">
					Valor total: R${total}
				</CustomText>
			</Total>
			<Botao
				onPress={() =>
					navigation.navigate('BuscandoPrestador', { selecionados: route.params.selecionados, total })
				}
			>
				<CustomText fontSize="20px" type="semiBold">
					Confirmar
				</CustomText>
			</Botao>
		</Container>
	);
}

function ItemLista({ item }) {
	return (
		<Item>
			<ItemWrap>
				<CustomText fontSize="18px" color={colors.cinza}>
					{item.descricao}
				</CustomText>
			</ItemWrap>
			<ItemWrap>
				<CustomText fontSize="18px" color={colors.cinza} align="right" type="semiBold">
					<CustomText color={colors.cinza} fontSize="14px" paddingRight="20px" paddingLeft="20px">
						R${item.valor} -{' '}
					</CustomText>
					x{item.quantidade}
				</CustomText>
			</ItemWrap>
		</Item>
	);
}
