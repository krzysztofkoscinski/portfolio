# Baza wiedzy projektu

Krótki zapis zweryfikowanych informacji. Aktualizuj po potwierdzeniu trwałych zmian; nie zamieniaj niewiadomych w założone fakty.

## Potwierdzony stan techniczny
- Projekt jest opisany jako portfolio SDET mające prezentować podejście autora do testowania oprogramowania.
- Testy są w `tests/`, a konfiguracja Playwright w `playwright.config.ts`.
- Zależność testowa: `@playwright/test`. Konfiguracja uruchamia Chromium, Firefox i WebKit; reporter jest ustawiony na HTML.
- Aktualny `tests/example.spec.ts` zawiera testy przykładowe dotyczące `playwright.dev`, a nie funkcjonalności właściwego portfolio.
- GitHub Actions wykonuje `npm ci`, instaluje przeglądarki Playwright i uruchamia `npx playwright test` dla push/PR do `main` lub `master`.
- ESLint używa flat config w `eslint.config.mjs`, sprawdza JavaScript/TypeScript i pomija pliki Markdown. `npm run lint` uruchamia sprawdzanie.
- Husky uruchamia `npm run lint` w hooku `.husky/pre-commit`; lokalny hook można ominąć przez `git commit --no-verify`.
- `package.json` zawiera zależności Prettier, Husky i dotenv; sama obecność pakietu nie potwierdza jego konfiguracji ani użycia.
- W `playwright.config.ts` konfiguracja dotenv i `baseURL` są zakomentowane. Nie potwierdzono konfiguracji testów API.

## Do doprecyzowania
- Docelowy zakres portfolio, odbiorcy i środowisko/aplikacja pod testem.
- Wymagania produktowe oraz przypadki UI/API.
- Czy dodać lint do GitHub Actions i wymagać pozytywnego statusu CI przed scaleniem.
- Czy i jak skonfigurować dotenv oraz Prettier.

## Utrzymanie
- Zaktualizuj tę bazę, gdy repozytorium lub uzgodnione wymagania zmienią powyższy stan.
- Przy każdej informacji odróżniaj stan sprawdzony od planu lub otwartego pytania.
