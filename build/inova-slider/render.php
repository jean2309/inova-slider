<?php
if ( isset( $attributes['images'] ) && ! empty( $attributes['images'] ) ) :
    $images = $attributes['images'];
    $qtdImagens = isset( $attributes['qtdImagens'] ) ? $attributes['qtdImagens'] : 3;
    $sliderLoop = isset( $attributes['sliderLoop'] ) ? $attributes['sliderLoop'] : 3;

    ?>
    <div id="ivs-slider-galeria">
		<div class="ivs-slider-galeria" data-slider-loop="<?php echo esc_attr( $sliderLoop ); ?>" data-qtd-imagens="<?php echo esc_attr( $qtdImagens ); ?>">
			<div class="ivs-slider-galeria-container">
				<?php foreach ( array_slice( $images, 0) as $image_id ) {
				$image_url = wp_get_attachment_url( $image_id['id'] ); 
				if ( $image_url ) { ?>
					<div class="ivs-slider-galeria-item"  data-url-imagens="<?php echo esc_url( $image_url ); ?>">
						<img src="<?php echo esc_url( $image_url ); ?>"  alt="Imagem do Slider" loading="lazy"/>
					</div>
					<?php } 
			} ?>
			</div>
		</div>
	</div>
<?php else : ?>
    <p>Não há imagens selecionadas.</p>
<?php endif; ?>
