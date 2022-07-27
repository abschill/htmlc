import { toLocale, Locale, AnyLoadConfig } from 'htmlc-types';
const { warn } = console;

export function checkIntlCode(u_config: AnyLoadConfig): Locale {
	if (!u_config || !u_config.intlCode) return Locale.en;
	if (u_config && u_config.errorSuppression) {
		try {
			return toLocale(u_config.intlCode);
		} catch (e) {
			warn(
				'Language Code Failed to Register, please ensure you enter a valid intl lang/country code'
			);
			warn(e);
			return Locale.en;
		}
	} else {
		return toLocale(u_config.intlCode);
	}
}
