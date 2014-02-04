<?php
/**
 * La configuration de base de votre installation WordPress.
 *
 * Ce fichier contient les réglages de configuration suivants : réglages MySQL,
 * préfixe de table, clefs secrètes, langue utilisée, et ABSPATH.
 * Vous pouvez en savoir plus à leur sujet en allant sur 
 * {@link http://codex.wordpress.org/Editing_wp-config.php Modifier
 * wp-config.php} (en anglais). C'est votre hébergeur qui doit vous donner vos
 * codes MySQL.
 *
 * Ce fichier est utilisé par le script de création de wp-config.php pendant
 * le processus d'installation. Vous n'avez pas à utiliser le site web, vous
 * pouvez simplement renommer ce fichier en "wp-config.php" et remplir les
 * valeurs.
 *
 * @package WordPress
 */

// ** Réglages MySQL - Votre hébergeur doit vous fournir ces informations. ** //
/** Nom de la base de données de WordPress. */
define('DB_NAME', 'datapaper');

/** Utilisateur de la base de données MySQL. */
define('DB_USER', 'root');

/** Mot de passe de la base de données MySQL. */
define('DB_PASSWORD', '');

/** Adresse de l'hébergement MySQL. */
define('DB_HOST', 'localhost');

/** Jeu de caractères à utiliser par la base de données lors de la création des tables. */
define('DB_CHARSET', 'utf8');

/** Type de collation de la base de données. 
  * N'y touchez que si vous savez ce que vous faites. 
  */
define('DB_COLLATE', '');

/**#@+
 * Clefs uniques d'authentification et salage.
 *
 * Remplacez les valeurs par défaut par des phrases uniques !
 * Vous pouvez générer des phrases aléatoires en utilisant 
 * {@link https://api.wordpress.org/secret-key/1.1/salt/ le service de clefs secrètes de WordPress.org}.
 * Vous pouvez modifier ces phrases à n'importe quel moment, afin d'invalider tous les cookies existants.
 * Cela forcera également tous les utilisateurs à se reconnecter.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         'OAV.5X}Z(llR|y=`JQVP kR/}|yRX};4VB_&ab*6r@AsA-yrl_c+sKApxs7ua4Mg');
define('SECURE_AUTH_KEY',  'I+i=$ 2h=#k78h1STlZ9>3Rw/?yQ1.jgpCftLzd}@Qy/ALgetK6h;RGzmqbpQ6JB');
define('LOGGED_IN_KEY',    '/.ASZ^~FGZ]CDCpFXj.2YtAl1A:!}Y6z7%x.3~>5G-su?2V#*s7Ru)WK,hmXkN~G');
define('NONCE_KEY',        'y)3)07wXd),L;_)_tmDadr5A~*F7g:ZYJVPs[Bn)fIfg78sa bu5#|)]R$h-Q[Z?');
define('AUTH_SALT',        'fZHX55[&(4`(NgZgsOH=`PhBwG1sKM@K-0mU{KY^fTA).;P%4I5:`SM{6:e+h3=M');
define('SECURE_AUTH_SALT', 'KSC-7O,TFQ;:nfnA=7Gbm)HQy!ceQ8%AGcYA+@BcDoB>k7|[W E-.ysL8MLJIR(}');
define('LOGGED_IN_SALT',   'A*8Th`qOm/Xl#tpARw:Z3I(TtV^JmAkrEm{JU<!uZpb|fIrj1,}CUtcoSLp!1<x_');
define('NONCE_SALT',       'r,BGh@FNz>yT$^13]Vs[8I`?Wc,VW[.lYs#q9q-X8YR+/0qij4,fFSS+(M;D(5vB');
/**#@-*/

/**
 * Préfixe de base de données pour les tables de WordPress.
 *
 * Vous pouvez installer plusieurs WordPress sur une seule base de données
 * si vous leur donnez chacune un préfixe unique. 
 * N'utilisez que des chiffres, des lettres non-accentuées, et des caractères soulignés!
 */
$table_prefix  = 'wp_';

/**
 * Langue de localisation de WordPress, par défaut en Anglais.
 *
 * Modifiez cette valeur pour localiser WordPress. Un fichier MO correspondant
 * au langage choisi doit être installé dans le dossier wp-content/languages.
 * Par exemple, pour mettre en place une traduction française, mettez le fichier
 * fr_FR.mo dans wp-content/languages, et réglez l'option ci-dessous à "fr_FR".
 */
define('WPLANG', 'fr_FR');

/** 
 * Pour les développeurs : le mode deboguage de WordPress.
 * 
 * En passant la valeur suivante à "true", vous activez l'affichage des
 * notifications d'erreurs pendant votre essais.
 * Il est fortemment recommandé que les développeurs d'extensions et
 * de thèmes se servent de WP_DEBUG dans leur environnement de 
 * développement.
 */ 
define('WP_DEBUG', false); 

/* C'est tout, ne touchez pas à ce qui suit ! Bon blogging ! */

/** Chemin absolu vers le dossier de WordPress. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Réglage des variables de WordPress et de ses fichiers inclus. */
require_once(ABSPATH . 'wp-settings.php');