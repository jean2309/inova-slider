import { __ } from '@wordpress/i18n';
import { MediaUpload, MediaUploadCheck } from '@wordpress/block-editor';
import { Button, RangeControl, ToggleControl } from '@wordpress/components';
import { useBlockProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useState, useEffect } from 'react';
import './editor.scss';

export default function Edit({ attributes, setAttributes }) {
	const { images, qtdImagens, sliderLoop } = attributes;

	useEffect(() => {
		const funcUpdateImageUrls = () => {
			const atualizarImagens = images.map((image) => {
				if (image.url) return image;
				const attachment = wp.media.attachment(image.id);
				return { ...image, url: attachment?.get('url') || '' };
			});
			setAttributes({ images: atualizarImagens });
		};
		funcUpdateImageUrls();
	}, []);

	// Função para adicionar imagens
	const funcSelecionarImagens = (newImages) => {
		const atualizarImagens = newImages.map((image) => ({
			id: image.id,
			url: image.url,
		}));
		setAttributes({ images: atualizarImagens });
	};

	// Função Campo para definir a quantidade de imagens a ser exibida no slider
	const funcQtdImagensEmExibicao = (value) => {
		setAttributes({ qtdImagens: value });
	};

	// Função Campo para definir se o slider vai ter loop ou não
	const funcSliderLoop = (value) => {
		setAttributes({ sliderLoop: value });
	};

	return (
		<>
			<div {...useBlockProps()}>
				<h2>{__('Inova Slider', 'inova-slider')}</h2>

				<MediaUploadCheck>
					<MediaUpload
						onSelect={funcSelecionarImagens}
						allowedTypes={['image']}
						value={images.map((image) => image.id)}
						multiple
						gallery
						render={({ open }) => (
							<Button className='btn-adicionar-imagens' onClick={open}>
								{__('Selecionar imagens', 'inova-slider')}
							</Button>
						)}
					/>
				</MediaUploadCheck>

				<div className="ivs-slider-preview">
					{images.length > 0 ? (
						<ul className={'ivs-qtd-imagens ivs-qtd-imagens-' + qtdImagens}>
							{/* {images.slice(0, qtdImagens).map((image, index) => ( */}
							{images.slice(0).map((image, index) => (
								<li key={index}>
									<img src={image.url} alt={`Slider Image ${index + 1}`} />
								</li>
							))}
						</ul>
					) : (
						<p>{__('Nenhuma imagem selecionada', 'inova-slider')}</p>
					)}
				</div>
			</div>


			{/* Componente InspectorControls e PanelBody foram descobertos através de IA. */}
			<InspectorControls>
				<PanelBody title={__('Inova Slider Configurações', 'inova-slider')} initialOpen={true}>
					{/* Campo para o número de imagens a serem exibidas */}
					<RangeControl
						label={__('Selecione a quantidade de imagens em exibição', 'inova-slider')}
						value={qtdImagens}
						onChange={funcQtdImagensEmExibicao}
						min={1}
						max={6}
						step={1}
					/>

					{/* Campo para ativar/desativar o loop */}
					<ToggleControl
						label={__('Slider em loop infinito', 'inova-slider')}
						checked={sliderLoop}
						onChange={funcSliderLoop}
					/>
				</PanelBody>
			</InspectorControls>
		</>
	);
}
