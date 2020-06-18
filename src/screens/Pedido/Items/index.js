import React, { useState, useEffect } from 'react';
import { FlatList, Image } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';

import * as colors from '../../../styles/colors';
import CustomText from '../../../components/UI/Text';

import {
	Container,
	Carrousel,
	ItemSlide,
	ItemSlideIcone,
	Item,
	TextoContainer,
	BotaoContainer,
	BotaoLista,
	Botao,
} from './styles';

export default function Items({ navigation }) {
	const [pecas, setPecas] = useState([
		{ id: 1, tipo: 1, categoria: 1, descricao: 'Camisa', quantidade: 0, valor: 2 },
		{ id: 2, tipo: 2, categoria: 2, descricao: 'Camiseta', quantidade: 0, valor: 2 },
		{ id: 3, tipo: 2, categoria: 3, descricao: 'Calça Jeans', quantidade: 0, valor: 3 },
		{ id: 4, tipo: 2, categoria: 3, descricao: 'Shorts Jeans', quantidade: 0, valor: 4 },
		{ id: 5, tipo: 2, categoria: 4, descricao: 'Shorts Licra', quantidade: 0, valor: 4 },
		{ id: 6, tipo: 1, categoria: 5, descricao: 'Blusa de malha', quantidade: 0, valor: 4 },
		{ id: 7, tipo: 1, categoria: 6, descricao: 'Moletom', quantidade: 0, valor: 5 },
		{ id: 8, tipo: 2, categoria: 6, descricao: 'Moletom', quantidade: 0, valor: 5 },
		{ id: 9, tipo: 3, categoria: 7, descricao: 'Roupa Intima', quantidade: 0, valor: 5 },
	]);
	const [tipos, setTipos] = useState([
		{ id: 1, tipo: 1, descricao: 'Superior' },
		{ id: 2, tipo: 2, descricao: 'Inferior' },
		{ id: 3, tipo: 3, descricao: 'Acessórios' },
	]);
	const [filtrados, setFiltrados] = useState([]);

	function carregaItems(tipo) {
		setFiltrados(pecas.filter((x) => x.tipo === tipo));
	}

	function aumentaQuantidade(id) {
		let altera = pecas.map((item) => {
			if (item.id === id) {
				item.quantidade++;
			}
			return item;
		});
		setPecas(altera);
	}

	function diminuiQuantidade(id) {
		let altera = pecas.map((item) => {
			if (item.id === id && item.quantidade > 0) {
				item.quantidade--;
			}
			return item;
		});
		setPecas(altera);
	}

	function confirmacao() {
		const selecionados = pecas.filter((x) => x.quantidade > 0);
		if (selecionados.length === 0) {
			alert('Você precisa selecionar algum item!');
			return;
		}
		navigation.navigate('Revisao', { selecionados });
	}

	useEffect(() => {
		carregaItems(1);
	}, []);

	return (
		<Container>
			<Carrousel>
				<FlatList
					horizontal
					data={tipos}
					renderItem={({ item }) => <SlideItem item={item} />}
					keyExtractor={(item) => item.id}
				/>
			</Carrousel>

			<FlatList
				data={filtrados}
				renderItem={({ item }) => <ItemLista item={item} />}
				keyExtractor={(item) => item.id}
			/>

			<Botao onPress={confirmacao}>
				<CustomText fontSize="14px" type="semiBold">
					<FontAwesomeIcon style={{ color: '#fff' }} size={20} icon={faArrowRight} />
				</CustomText>
			</Botao>
		</Container>
	);

	function ItemLista({ item }) {
		return (
			<Item>
				<TextoContainer>
					<CustomText fontSize="16px" color={colors.cinza}>
						{item.descricao}
					</CustomText>
				</TextoContainer>
				<BotaoContainer>
					<CustomText fontSize="15px" color={colors.cinza}>
						R${item.valor}
					</CustomText>
					<BotaoLista onPress={() => aumentaQuantidade(item.id)}>
						<CustomText fontSize="15px">+</CustomText>
					</BotaoLista>
					<CustomText fontSize="15px" color={colors.cinza}>
						{item.quantidade}
					</CustomText>
					<BotaoLista onPress={() => diminuiQuantidade(item.id)}>
						<CustomText fontSize="16px">-</CustomText>
					</BotaoLista>
				</BotaoContainer>
			</Item>
		);
	}

	function SlideItem({ item }) {
		return (
			<ItemSlide onPress={() => carregaItems(item.tipo)}>
				{item.tipo === 1 && (
					<ItemSlideIcone>
						<Image
							source={require('../../../../assets/icons/camiseta.png')}
							style={{ width: 25, height: 25 }}
						/>
					</ItemSlideIcone>
				)}

				{item.tipo === 2 && (
					<ItemSlideIcone>
						<Image
							source={require('../../../../assets/icons/calcas.png')}
							style={{ width: 25, height: 25 }}
						/>
					</ItemSlideIcone>
				)}

				{item.tipo === 3 && (
					<ItemSlideIcone>
						<Image
							source={require('../../../../assets/icons/oculos-escuros.png')}
							style={{ width: 25, height: 25 }}
						/>
					</ItemSlideIcone>
				)}

				<CustomText fontSize="14px" color={colors.cinza}>
					{item.descricao}
				</CustomText>
			</ItemSlide>
		);
	}
}
