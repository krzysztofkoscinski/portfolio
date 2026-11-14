# TODO

Lista najbliższych otwartych zadań. Limit: 40 linii; aktualizuj po zmianie priorytetów i ukończeniu pracy.

## Plan automatyzacji panelu VB Bank

Bezpieczne kontrole odczytowe dla wszystkich zakładek są w `tests/banking-read-only.spec.ts`. Poniższe zadania dotyczą pełnych przepływów i wymagają stabilnych danych testowych.

- [ ] Potwierdzić wymagania przypadków z `tests/banking-functional-test-cases.md`, w tym zgodność danych Dashboard i History.
- [ ] Przygotować izolowane konta, transakcje i kartę testową oraz procedurę resetu danych.
- [ ] Zapewnić sandbox dla przelewów, płatności rachunków, wniosków i doładowań; bez operacji na prawdziwych środkach.
- [ ] Zautomatyzować TC-DASH-001 i TC-HISTORY-001 na deterministycznym zestawie danych.
- [ ] Zautomatyzować TC-CARD-001 z kartą utworzoną przez fixture.
- [ ] Zautomatyzować TC-TRANSFER-001 i zweryfikować saldo oraz wpis w historii.
- [ ] Zautomatyzować TC-BILL-001 i zweryfikować saldo oraz zapis płatności.
- [ ] Zautomatyzować TC-LOAN-001 w środowisku testowym.
- [ ] Zautomatyzować TC-TOPUP-001 z bramką płatniczą sandbox.
- [ ] Zautomatyzować TC-SETTINGS-001 na koncie, którego dane można przywrócić.
- [ ] Uruchomić nowe testy w Chromium, Firefox i WebKit oraz dodać je do walidacji CI.

## Pozostałe zadania

- [ ] Doprecyzować cel portfolio, odbiorców i docelowe środowisko testowe poza domyślnym demo.
- [ ] Ustalić wymagania i zakres testów API.
- [ ] Rozważyć lint w GitHub Actions i wymagany status CI, jeśli potrzebna jest ochrona przed pominięciem hooka.
