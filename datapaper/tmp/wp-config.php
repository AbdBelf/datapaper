<?php
/**
 * The base configurations of the WordPress.
 *
 * This file has the following configurations: MySQL settings, Table Prefix,
 * Secret Keys, WordPress Language, and ABSPATH. You can find more information
 * by visiting {@link http://codex.wordpress.org/Editing_wp-config.php Editing
 * wp-config.php} Codex page. You can get the MySQL settings from your web host.
 *
 * This file is used by the wp-config.php creation script during the
 * installation. You don't have to use the web site, you can just copy this file
 * to "wp-config.php" and fill in the values.
 *
 * @package WordPress
 */

// ** MySQL settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define('DB_NAME', 'datapaper');

/** MySQL database username */
define('DB_USER', 'data');

/** MySQL database password */
define('DB_PASSWORD', 'Word..Data');

/** MySQL hostname */
define('DB_HOST', 'localhost');

/** Database Charset to use in creating database tables. */
define('DB_CHARSET', 'utf8');

/** The Database Collate type. Don't change this if in doubt. */
define('DB_COLLATE', '');

/**#@+
 * Authentication Unique Keys and Salts.
 *
 * Change these to different unique phrases!
 * You can generate these using the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}
 * You can change these at any point in time to invalidate all existing cookies. This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define('AUTH_KEY',         '}oEc)9Sj$%LgbhABNfrr2PkB4?+={:j-fkpEK#cDO(HRS ;`u$;s*g-+O+dabXG*');
define('SECURE_AUTH_KEY',  '^>pQ57CoAuVl-wbGobW]s1}`5(~pf3NLi-1<5tv+v2W];jVBHcv%go?}P|?}y1&]');
define('LOGGED_IN_KEY',    'T&AUH|Oji-)&3:nzEdLs++9CO]!uuY!)O/6hy4t|fi|^&(:N=f6<po[]se;vfL X');
define('NONCE_KEY',        '`9x|RJw=x+o*k!fag9r!XtXDz>sfRv5,7d&eDR-R+b_G}2{[&+Upg<:A9ZyX8c/S');
define('AUTH_SALT',        '8)L-PAwqVeqE+.-r-+@K-m3KF8c$C_C[(pD!yPict2|u|eOJ*}HA @%?m-7TbyBl');
define('SECURE_AUTH_SALT', '3|C*N;gQANMRM@Av|MXAU>CG~1<ti+zQ|SE>Pz?T5Xk$lfLr;S:|>_nlA+GHM]^j');
define('LOGGED_IN_SALT',   '@:.?s5Mw|-EW19P71Yb4JNZjjleZL5cOsi{_+}Xi)t121OIKI|s,S{ R/-~<YNKQ');
define('NONCE_SALT',       '~t4X+=-%$]xYZl4bLDEC#y&`C0?4Gk67~6]!QQLe=(MQF=wh9a+7LyuxEhyop8(Y');

/**#@-*/

/**
 * WordPress Database Table prefix.
 *
 * You can have multiple installations in one database if you give each a unique
 * prefix. Only numbers, letters, and underscores please!
 */
$table_prefix  = 'wp_';

/**
 * WordPress Localized Language, defaults to English.
 *
 * Change this to localize WordPress. A corresponding MO file for the chosen
 * language must be installed to wp-content/languages. For example, install
 * de_DE.mo to wp-content/languages and set WPLANG to 'de_DE' to enable German
 * language support.
 */
define('WPLANG', '');

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 */
define('WP_DEBUG', false);

/* That's all, stop editing! Happy blogging. */

/** Absolute path to the WordPress directory. */
if ( !defined('ABSPATH') )
	define('ABSPATH', dirname(__FILE__) . '/');

/** Sets up WordPress vars and included files. */
require_once(ABSPATH . 'wp-settings.php');
