# Plan automatyzacji testów API — Restful Booker

**Status:** częściowo zaimplementowany; testy oznaczone jako gotowe działają w projekcie Playwright `api`  
**Źródło kontraktu:** [dokumentacja Restful Booker API](https://restful-booker.herokuapp.com/apidoc/index.html)  
**Bazowy adres API:** `https://restful-booker.herokuapp.com`

## Cel i zakres

Dodać do portfolio testy kontraktu i podstawowych przepływów API: health check, uwierzytelnianie oraz CRUD rezerwacji. Testy mają używać Playwright Test, który jest już zależnością projektu, i nie mają zależeć od istniejących danych w publicznym demo.

Zakres endpointów:

- `GET /ping`
- `POST /auth`
- `GET /booking` oraz `GET /booking/{id}`
- `POST /booking`, `PUT /booking/{id}`, `PATCH /booking/{id}`, `DELETE /booking/{id}`

Poza zakresem: testy obciążeniowe, bezpieczeństwa jako audyt, produkcyjne SLA i testy UI systemu Restful Booker.

## Proponowane przypadki

Priorytety oznaczają kolejność wdrażania, nie gwarantujący kontrakt API status.

| ID | Priorytet | Przypadek | Główne asercje | Stan |
|---|---|---|---|---|
| TC-API-001 | P1 | Health check | `GET /ping` zwraca udokumentowany i zaobserwowany status `201`. | Zaimplementowany |
| TC-API-002 | P1 | Utworzenie tokenu poprawnymi danymi | `POST /auth` zwraca status `200` i niepusty token tekstowy. | Zaimplementowany |
| TC-API-003 | P2 | Odrzucenie niepoprawnych danych logowania | Demo zwraca `200` i `{ "reason": "Bad credentials" }`, bez tokenu. | Zaimplementowany |
| TC-API-004 | P1 | Utworzenie rezerwacji | `POST /booking` zwraca status `200`, identyfikator oraz rezerwację zgodną z wysłanymi danymi. | Zaimplementowany |
| TC-API-005 | P1 | Odczyt utworzonej rezerwacji | `GET /booking/{id}` zwraca dane utworzonej przez test rezerwacji. | Zaimplementowany |
| TC-API-006 | P1 | Filtrowanie listy rezerwacji | Filtry imienia i nazwiska zwracają unikalny rekord testowy; semantyka filtrów dat pozostaje do potwierdzenia. | Częściowy |
| TC-API-007 | P1 | Pełna aktualizacja rezerwacji | `PUT` z tokenem zapisuje pełny payload; odpowiedź i późniejszy odczyt zwracają zmienione wartości. | Zaimplementowany |
| TC-API-008 | P1 | Częściowa aktualizacja rezerwacji | `PATCH` z tokenem zmienia wskazane pole, a pominięte pola zachowują wartości. | Zaimplementowany |
| TC-API-009 | P1 | Autoryzacja modyfikacji | Brak tokenu przy `PUT` i niepoprawny token przy `DELETE` zwracają `403`; dane pozostają bez zmian. | Zaimplementowany |
| TC-API-010 | P1 | Usunięcie własnej rezerwacji | `DELETE` usuwa rekord utworzony przez test; późniejszy odczyt potwierdza odpowiedź `404`. | Zaimplementowany |
| TC-API-011 | P2 | Niepoprawny payload | Ujęto jako charakterystykę aktualnego demo: niekompletny payload zwraca `500 Internal Server Error`, a nie błąd walidacji klienta. | Zaimplementowany (charakterystyka) |
| TC-API-012 | P2 | Obsługa formatów odpowiedzi | Przy `Accept: application/xml` odpowiedź zawiera XML z danymi rezerwacji. Nie asertuje się nagłówka, bo demo zwraca `text/html`. | Częściowy |

### Dane rezerwacji

Do przypadków tworzenia i aktualizacji używać fikcyjnych danych: unikalnego znacznika w `firstname` lub `additionalneeds`, wartości `totalprice`, `depositpaid` oraz dat `bookingdates.checkin` i `bookingdates.checkout`. Wartości mają służyć identyfikacji i asercjom, a nie zakładać nieudokumentowane ograniczenia biznesowe.

## Plan realizacji

1. **Potwierdzić kontrakt** — rozbieżne i niepożądane zachowania demo są opisane poniżej; asercje dla nich charakteryzują bieżącą odpowiedź, a nie deklarują docelowego kontraktu.
2. **Przygotować konfigurację** — dodano testy w `tests/api/`, wbudowane fixture Playwright `request` oraz zmienną `API_BASE_URL` z domyślnym adresem demo.
3. **Oddzielić projekt API** — dodano projekt Playwright `api` uruchamiany raz; projekty Chromium, Firefox i WebKit pomijają testy API.
4. **Zautomatyzować przypadki P1** — zaimplementowano health check, token, CRUD, filtry nazw i kontrolę autoryzacji; filtry dat wymagają dalszej weryfikacji.
5. **Dodać przypadki P2** — zaimplementowano błędne logowanie, charakterystykę błędu niekompletnego payloadu i treść odpowiedzi XML; nagłówek XML wymaga wyjaśnienia.
6. **Włączyć do CI** — uruchamiać API razem z pozostałymi testami Playwright i zachować raport w obecnym artefakcie `playwright-report`.

## Izolacja i stabilność

- Każdy test modyfikujący dane tworzy własną rezerwację z unikalnym znacznikiem; nie aktualizuje ani nie usuwa zastanych rekordów.
- Test nie zakłada, że publiczna lista rezerwacji ma stałą zawartość ani rozmiar.
- Po utworzeniu rezerwacji test sprząta wyłącznie własny rekord, także po niepowodzeniu asercji. Błąd sprzątania nie powinien być ukrywany.
- Testy powinny być niezależne i bezpieczne przy równoległym uruchomieniu. Nie współdzielą tokenów ani rezerwacji.
- Publiczne demo jest zewnętrzną zależnością CI. Jego niedostępność należy raportować jako błąd testu/środowiska, a nie maskować ponawianiem bez ograniczeń.
- Używać wyłącznie fikcyjnych danych. Nie dodawać do repozytorium prywatnych danych ani sekretów; dokumentacja API pokazuje przykładowe dane dostępowe do demo.

## Niewiadome do rozstrzygnięcia

- Dokumentacja `GET /ping` opisuje sukces jako `200`, ale przykład odpowiedzi pokazuje `201 Created`.
- Dokumentacja `DELETE /booking/{id}` opisuje sukces jako `200`, ale przykład również pokazuje `201 Created`.
- Odpowiedź demo dla błędnego logowania to `200` z `{"reason":"Bad credentials"}`; dla nieautoryzowanego `PUT`/`DELETE` to `403`.
- Niekompletny payload obecnie daje `500 Internal Server Error`; to zaobserwowany błąd serwera, nie pożądana walidacja wejścia.
- Filtry dat nie zwracały stabilnie rezerwacji utworzonej przez test zgodnie z opisem dokumentacji, dlatego na razie automatyzowane są filtry imienia i nazwiska.
- XML jest zwracany w treści przy `Accept: application/xml`, ale nagłówek odpowiedzi ma wartość `text/html; charset=utf-8`.

## Kryteria ukończenia

- Wszystkie przypadki wdrożone mają stabilne ID z tej listy w tytule testu.
- Testy API uruchamiają się raz, są niezależne od projektów przeglądarek i działają przez `npx playwright test`.
- Testy zapisujące dane używają wyłącznie rekordów utworzonych przez siebie i sprzątają po zakończeniu.
- Asercje odróżniają udokumentowany kontrakt od charakterystyki aktualnych, niespójnych odpowiedzi publicznego demo.
- CI publikuje raport Playwright także wtedy, gdy testy zakończą się niepowodzeniem.
