<?php
function enqueue_parent_theme_style() {
    wp_enqueue_style( $parent_style, get_template_directory_uri() . '/style.css' );
    wp_enqueue_style( 'child-style',
        get_stylesheet_directory_uri() . '/style.css',
        array('twenty-twenty-one-style'),
        wp_get_theme()->get('Version')
    );
    wp_enqueue_script( 'carousel-js', get_stylesheet_directory_uri() . '/assets/js/carousel.js', array( 'jquery' ),'',true );
    wp_enqueue_script( 'custom-js', get_stylesheet_directory_uri() . '/assets/js/script.js', array(),'',true );
}
add_action( 'wp_enqueue_scripts', 'enqueue_parent_theme_style' );

function mytheme_customize_register( $wp_customize ) {
    $wp_customize->get_setting( 'blogname' )->transport         = 'postMessage';
    $wp_customize->get_setting( 'blogdescription' )->transport  = 'postMessage';
    $wp_customize->get_setting( 'header_textcolor' )->transport = 'postMessage';

    if ( isset( $wp_customize->selective_refresh ) ) {
        $wp_customize->selective_refresh->add_partial(
            'blogname',
            array(
                'selector'        => '.site-title a',
                'render_callback' => 'mytheme_customize_partial_blogname',
            )
        );
        $wp_customize->selective_refresh->add_partial(
            'blogdescription',
            array(
                'selector'        => '.site-description',
                'render_callback' => 'mytheme_customize_partial_blogdescription',
            )
        );
    }

    $wp_customize->add_setting('secondary_branding');
    $wp_customize->add_setting('secondary_branding_alt_text');
    $wp_customize->add_control(new WP_Customize_Image_Control($wp_customize, 'secondary_branding', array(
        'label' => 'Secondary Logo',
        'section' => 'title_tagline', 
        'settings' => 'secondary_branding',
        'priority' => 8 
    )));
    $wp_customize->add_control(new WP_Customize_Control($wp_customize, 'secondary_branding_alt_text', array(
        'label' => 'Secondary Logo Alt Text',
        'section' => 'title_tagline', 
        'settings' => 'secondary_branding_alt_text',
        'priority' => 8 
    )));
}
add_action( 'customize_register', 'mytheme_customize_register' );

function show_custom_fields($title, $id) {
    if(!is_admin()) {
        $parks = '';
        $resident = '';
        $apartment = '';
        $post = get_post();
        $appendCustomField = "<span class='title-text'>";
        if(get_post_meta($post->ID, 'Residential Space', true)) {
            $resident = '<div class="tooltip residential"><span class="title">Residential Space</span>' . '<span class="value">'. get_post_meta($post->ID, 'Residential Space', true) . '</span></div>';
        }
        if(get_post_meta($post->ID, 'Serviced Apartments', true)) {
            $apartment = '<div class="tooltip apartment"><span class="title">Serviced Apartments</span>' . '<span class="value">'. get_post_meta($post->ID, 'Serviced Apartments', true) . '</span></div>';
        }
        if(get_post_meta($post->ID, 'Parks & Open Spaces', true)) {
            $parks = '<div class="tooltip parks"><span class="title">Parks & Open Spaces</span>' . '<span class="value">'. get_post_meta($post->ID, 'Parks & Open Spaces', true) . '</span></div>';
        }
        $customFields = '<div class="customFields">'.$resident.$apartment.$parks.'</div>';
        $prependCustomField = "</span>" . $customFields;
        $title = $appendCustomField . $title . $prependCustomField;
    }
    return $title;
}
add_filter('the_title', 'show_custom_fields', 10, 2);

// we are working with menu, so remove the title filter
function remove_title_filter_nav_menu( $nav_menu, $args ) {
    remove_filter( 'the_title', 'show_custom_fields', 10, 2 );
    return $nav_menu;
}
// this filter fires just before the nav menu item creation process
add_filter( 'pre_wp_nav_menu', 'remove_title_filter_nav_menu', 10, 2 );

// we are done working with menu, so add the title filter back
function add_title_filter_non_menu( $items, $args ) {
    add_filter( 'the_title', 'show_custom_fields', 10, 2 );
    return $items;
}
// this filter fires after nav menu item creation is done
add_filter( 'wp_nav_menu_items', 'add_title_filter_non_menu', 10, 2 );