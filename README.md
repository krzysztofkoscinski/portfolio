# Portfolio

## Spis treści

- [Opis projektu i cel](#opis-projektu-i-cel)
- [Wymagania wstępne](#wymagania-wstępne)
- [Pierwsze kroki](#pierwsze-kroki)
- [Szczegóły](#szczegóły)

## Opis projektu i cel

Projekt SDET (Software Development Engineer in Test), którego celem jest prezentacja mojego podejścia do testowania oprogramowania.

**Zakres i docelowa zawartość portfolio:** do uzupełnienia.

## Wymagania wstępne

- Node.js w wersji LTS oraz npm.
- Git, jeśli chcesz sklonować repozytorium.
- Przeglądarki używane przez Playwright. Można je zainstalować poleceniem z sekcji [Pierwsze kroki](#pierwsze-kroki).

## Pierwsze kroki

1. Sklonuj repozytorium i przejdź do katalogu projektu:

	```bash
	git clone https://github.com/krzysztofkoscinski/portfolio.git
	cd portfolio
	```

2. Zainstaluj zależności:

	```bash
	npm ci
	```

3. Zainstaluj przeglądarki Playwright:

	```bash
	npx playwright install
	```

4. Uruchom testy:

	```bash
	npx playwright test
	```

5. Sprawdź ESLint:

	```bash
	npm run lint
	```

## Szczegóły

- Testy znajdują się w katalogu `tests/`.
- Konfiguracja Playwright znajduje się w pliku `playwright.config.ts`.
- Obecna konfiguracja uruchamia testy w Chromium, Firefox i WebKit.
- Przykładowe testy sprawdzają stronę `playwright.dev`; nie opisują jeszcze funkcjonalności właściwego portfolio.
- Raport HTML jest skonfigurowany jako reporter testów. Szczegóły docelowego raportowania i dalszej struktury projektu: do uzupełnienia.
- ESLint jest uruchamiany poleceniem `npm run lint`; hook Husky `pre-commit` uruchamia lint przed commitem.
- ESLint pomija pliki Markdown. Hook jest lokalny i można go pominąć przez `git commit --no-verify`.
- `dotenv` i Prettier są zależnościami projektu. Konfiguracja zmiennych środowiskowych pozostaje zakomentowana.
