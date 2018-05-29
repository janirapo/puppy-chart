import i18n from 'i18next';

i18n.init(
    {
        resources: {
            fi: {
                translations: {
                    welcome: 'Tervetuloa {{name}}',
                    unknown_user: 'Tuntematon käyttäjä',
                    pet_name: 'Lemmikin nimi',
                    dob: 'Syntymäaika',
                    save: 'Tallenna',
                    add: 'Lisää',
                    close: 'Sulje',
                    add_pet: 'Lisää lemmikki',
                    required: 'Pakollinen tieto',
                    max_characters: 'Sisällön on oltava alle {{max}} merkkiä',
                    min_characters: 'Sisällön on oltava vähintään {{min}} merkkiä',
                    validate_number: 'On oltava numero',
                    invalid_email: 'Virheellinen sähköpostiosoite',
                    validate_alphanumeric: 'Ainoastaan alfanumeerinen sisältö sallittu',
                    pet_amount: 'Lemmikkien määrä: {{count}}',
                    age_in_unit: 'Ikä ({{unit}})',
                    years: 'vuotta',
                    months: 'kuukautta',
                    weeks: 'viikkoa',
                    days: 'päivää',
                    in_years: 'vuosissa',
                    in_months: 'kuukausissa',
                    in_weeks: 'viikoissa',
                    in_days: 'päivissä',
                    name: 'Nimi',
                    log_out: 'Kirjaudu ulos',
                    validate_date: 'Virheellinen päivämäärä',
                    pet_added: 'Uusi lemmikki lisätty',
                    cancel: 'Peruuta',
                    open: 'Avaa',
                    age: 'Ikä',
                    height: 'Korkeus',
                    weight: 'Paino',
                    owner: 'Omistaja',
                    no_results: 'Ei tuloksia',
                    add_measurement: 'Lisää uusi mittaustulos',
                    show_measurement_rows: 'Näytä mittaustulosrivit',
                    hide_measurement_rows: 'Piilota mittaustulosrivit',
                    date: 'Päivämäärä',
                    value: 'Arvo',
                    created: 'Lisätty',
                    remove: 'Poista',
                    measurement_added: 'Mittaustulos lisätty',
                    measurement_removed: 'Mittaustulos poistettu',
                    username: 'Käyttäjätunnus',
                    password: 'Salasana',
                    log_in: 'Kirjaudu sisään',
                    clear_values: 'Tyhjennä',
                    invalid_email_or_password: 'Virheellinen käyttäjätunnus tai salasana',
                    log_out_confirmation: 'Haluatko varmasti kirjautua ulos?',
                    remove_pet: 'Poista lemmikki',
                    remove_pet_confirmation:
                        'Halutko varmasti poistaa valitun lemmikin? Tietoja ei voida enää palauttaa.',
                    pet_removed: 'Lemmikki poistettu',
                },
            },
            en: {
                translations: {
                    welcome: 'Welcome',
                    pet_name: 'Pet name',
                    dob: 'Date of birth',
                },
            },
        },
        lng: 'fi',
        fallbackLng: 'fi',
        debug: process.env.NODE_ENV !== 'production',
        ns: ['translations'],
        defaultNS: 'translations',
        keySeparator: true,
        interpolation: {
            formatSeparator: ',',
        },
        react: {
            wait: true,
        },
    },
    err => {
        if (err) {
            return console.error('i18n error', err);
        }
        console.log('i18n successfully initialized');
    },
);

/**
 * Translation function
 *
 * @param value
 * @param options
 * @returns {*}
 */
export const t = (value, options) => i18n.t(value, options);

export default i18n;
