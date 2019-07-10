# Coin Counter
This is a simple project designed to allow a person to practice counting coins

## Setup
To install the dependencies for this project, run:
```npm install```
To build the artifacts for this project, run:
```npm run build```
To deploy using firebase, run:
```npm run deploy```

## Additional Currency/Language
Each of the language and currency configurations are written in YAML and uses gulp to transform them into a JSON which the browser with then request when it needs that resource.

### Add a New Currency
1. Create a file under `web/yaml/currency`, preferably with the country code of the chosen currency. Make sure it matches the format, using `web/yaml/currency/us.yml` as a guide.
2. Add an entry in `web/yaml/index.yml` with both the country code and the file location relative to `web/yaml`. File format should be `/currency/{country-code}`.
3. Using the url specified in the previous step, create another file at that location relative to `web/yaml` and postfixed with `.yml`. Using `web/yaml/currency/us.yml` as a guide, fill out the details of the currency.
  - Weight is the value required to go to a bigger value system. Such as there are 100 cents in a dollar.
  - Name will be a reference to a translation of the currency
  - Value is the value of that coin
  - Size is the size of the coin in millimeters
  - Images contains the path to the front and back sides of the coin. These should be located under `/images/{country-code}`, where `country-code` is the specified code of the currency
4. In order to display this currency, follow the instructions for adding a new language, starting at Step 3

### Add a New Language
1. Edit the file `web/yaml/index.yml` so that under languages, it has the new entry. It should have a language code, url for the language pack, and title for display. The title should be in its original language. URL should be of the format `/language/{language-code}`
2. Using the location specified in `web/yaml/index.yml`, create another file at that location, relative to `web/yaml` and postfixed with `.yml`. So, if the location was `/language/en`, there should be a corresponding file at `web/yaml/language/en.yml`.
  1. Within this file, specify the translation of "Coin Counter" within the chosen language as the title.
  2. For the URL, the format should follow `/language/{language-code}/core`
  2. Create another file which will contain the core translations of this application. If following the previous step, then the file should be `web/yaml/language/{language-code}/core.yml`. Follow `web/yaml/language/en/core.yml` as an example and for what to translate.
3. To add a language to the currency, edit the language file, `web/yaml/language/{language-code}.yml`. Add an entry under `currencies` following the same format as `web/yaml/language/en.yml` for United States.
  - Code should be the country code used in `index.yml`
  - Title should the name of the Country in the specified language
  - URL should follow the format `/language/{language-code}/currency/{country-code}`
4. Using the location specified in Step 3, create that file relative to `web/yaml` and postfixed with `.yml`. If following the format, then the file should be `web/yaml/language/{language-code}/currency/{country-code}.yml`.
5. Using the names specifed in `web/yaml/currency/{country-code}.yml` create a translation for each form of currency. So if the name was penny, then the file should have `penny: Penny`. This should be translated to the specified language

## Credits
Images of the US coins were gotten off of Wikipedia
