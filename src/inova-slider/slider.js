jQuery(document).ready(function ($) {
    $('.ivs-slider-galeria').each(function () {
        const $slider = $(this);
        const $sliderContainer = $slider.find('.ivs-slider-galeria-container');

        const config = {
            setas: true,
            padding: 20,
            delay: 500,
            loop: $slider.data('slider-loop') !== undefined ? $slider.data('slider-loop') : true,
            qtdImagens: $slider.data('qtd-imagens') || 1,
        };

        const qtdImagens = parseInt(config.qtdImagens, 10);
        const $images = $sliderContainer.find('.ivs-slider-galeria-item');
        let currentIndex = qtdImagens;
        const totalImages = $images.length;
        const sliderWidth = $slider.width();
        const sliderItemWidth = sliderWidth / qtdImagens;

        $sliderContainer.css('width', (sliderItemWidth * (totalImages + (config.loop ? qtdImagens * 2 : 0))) + 'px');
        $images.css({
            width: sliderItemWidth + 'px',
        });
        $images.find('img').css({
            padding: '0 ' + config.padding / 2 + 'px'
        });

        if (config.loop) {
            const $primeirosItensClonado = $images.slice(-qtdImagens).clone().addClass('cloned');
            const $ultimosItensClonado = $images.slice(0, qtdImagens).clone().addClass('cloned');
            $sliderContainer.prepend($primeirosItensClonado);
            $sliderContainer.append($ultimosItensClonado);
        }

        $sliderContainer.css('transform', `translate3d(${-currentIndex * sliderItemWidth}px, 0, 0)`);

        if (config.setas) {
            const arrows = `
                <div id="ivs-setas">
                    <button class="ivs-seta ivs-seta-esquerda">&lt</button>
                    <button class="ivs-seta ivs-seta-direita">&gt</button>
                </div>
            `;
            $slider.after(arrows);
        }

        // Atualizar itens ativos
        function funcAtualizarItensAtivos() {
            $sliderContainer.find('.ivs-slider-galeria-item').removeClass('ativo');
            for (let i = 0; i < qtdImagens; i++) {
                const realIndex = (currentIndex + i) % totalImages;
                $images.eq(realIndex).addClass('ativo');
            }
        }

        // Função para passar o slider
        function funcPassarSlider(instant = false) {
            const translateX = -currentIndex * sliderItemWidth;
            if (instant) {
                $sliderContainer.css('transition', 'none');
            } else {
                $sliderContainer.css('transition', 'transform 0.5s ease');
            }

            if (totalImages <= qtdImagens) {
                $sliderContainer.css('transform', `translate3d(0, 0, 0)`);
            } else {
                $sliderContainer.css('transform', `translate3d(${translateX}px, 0, 0)`);
            }
            funcAtualizarItensAtivos();
        }

        function funcAjustarIndice(direction) {
            if (!config.loop) {
                if (direction === 'esquerda' && currentIndex <= 0) {
                    currentIndex = 0;
                } else if (direction === 'direita' && currentIndex >= totalImages - qtdImagens) {
                    currentIndex = totalImages - qtdImagens;
                }
            }
        }

        if (config.setas) {
            $slider.next('#ivs-setas').find('.ivs-seta-esquerda').on('click tap', function () {
                $(this).prop('disabled', true);
                currentIndex--;
                funcAjustarIndice('esquerda');
                funcPassarSlider();
                setTimeout(() => {
                    $(this).prop('disabled', false);
                }, config.delay);
            });

            $slider.next('#ivs-setas').find('.ivs-seta-direita').on('click tap', function () {
                $(this).prop('disabled', true);
                currentIndex++;
                funcAjustarIndice('direita');
                funcPassarSlider();
                setTimeout(() => {
                    $(this).prop('disabled', false);
                }, config.delay);
            });
        }

        if (config.loop) {
            $sliderContainer.on('transitionend', function () {
                if (currentIndex === 0) {
                    currentIndex = totalImages;
                    funcPassarSlider(true);
                } else if (currentIndex === totalImages + qtdImagens) {
                    currentIndex = qtdImagens;
                    funcPassarSlider(true);
                }
            });
        }

        funcAtualizarItensAtivos();
        funcPassarSlider();
    });

    // Lightbox
    $('.ivs-slider-galeria-item').click(function (e) {
        e.preventDefault();
        const image_href = $(this).attr('data-url-imagens');
        if ($('#ivs-lightbox').length > 0) {
            $('#ivs-content-lightbox').html('<button>&times</button><img src="' + image_href + '" />');
            $('#ivs-lightbox').show();
        } else {
            const lightbox =
                '<div id="ivs-lightbox"><div id="ivs-content-lightbox"><button>&times</button>' +
                '<img src="' + image_href + '" />' +
                '</div></div>';
            $('body').append(lightbox);
        }
    });

    $('body').on('click', '#ivs-lightbox', function () {
        $('#ivs-lightbox').hide();
    });
});
