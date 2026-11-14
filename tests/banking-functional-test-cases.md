# Propozycje testów funkcjonalnych: panel VB Bank

**Status:** scenariusze zmieniające stan konta pozostają propozycjami; bezpieczne kontrole odczytowe są zautomatyzowane  
**Środowisko:** https://vb-bank-demo.vercel.app  
**Przeglądarki:** Chromium, Firefox i WebKit (projekty skonfigurowane w Playwright)

Każdy przypadek koncentruje się na jednej funkcji zakładki. Przyjęte konwencje opisano w [standardzie dokumentacji](./test-case-guidelines.md).

## TC-DASH-001 — Podsumowanie finansowe odpowiada danym konta

- **Cel:** Potwierdzić, że dashboard prezentuje saldo i podsumowania zgodne z danymi konta testowego.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Użytkownik jest zalogowany na koncie z ustalonym, niezmiennym zestawem danych.
- **Dane testowe:** Oczekiwane saldo, sumy i transakcje z fixture'a konta testowego.

**Kroki:**
1. Otwórz **Dashboard**.
2. Porównaj saldo, podsumowania oraz ostatnie transakcje z danymi fixture'a.

**Oczekiwany rezultat:**
- Saldo, sumy transakcji i ostatnie transakcje odpowiadają danym konta.

**Do potwierdzenia:** Aktualnie dashboard wyświetla transakcje, podczas gdy History pokazuje pustą listę. Przed ustaleniem asercji należy potwierdzić, czy oba widoki mają korzystać z tego samego zestawu danych.

## TC-TRANSFER-001 — Wykonanie przelewu między kontami testowymi

- **Cel:** Potwierdzić, że poprawny przelew obciąża nadawcę i jest widoczny w historii.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Istnieją dwa izolowane konta testowe; konto nadawcy ma wystarczające środki, a odbiorca jest aktywny.
- **Dane testowe:** Numer konta odbiorcy z fixture'a; kwota 25 USD.

**Kroki:**
1. Otwórz **Transfer**.
2. Wprowadź numer konta odbiorcy, kwotę i opis testowy.
3. Zatwierdź przelew.
4. Sprawdź saldo nadawcy i wpis w **History**.

**Oczekiwany rezultat:**
- Użytkownik otrzymuje potwierdzenie przelewu.
- Saldo nadawcy zmniejsza się o kwotę przelewu, a transakcja pojawia się w historii.

**Wymagane:** Dedykowane konta testowe i reset danych pomiędzy uruchomieniami. Nie wykonywać na koncie produkcyjnym ani współdzielonym.

## TC-HISTORY-001 — Filtrowanie historii do przychodów

- **Cel:** Potwierdzić, że filtr typu transakcji ogranicza wyniki historii.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Historia zawiera co najmniej jedną transakcję przychodzącą i jedną wychodzącą.
- **Dane testowe:** Zestaw transakcji z fixture'a, z rozróżnialnymi typami.

**Kroki:**
1. Otwórz **History**.
2. Ustaw filtr typu na **Income**.

**Oczekiwany rezultat:**
- Widoczne są transakcje przychodzące z zestawu testowego.
- Transakcje wychodzące nie są widoczne.

## TC-BILL-001 — Opłacenie rachunku

- **Cel:** Potwierdzić, że poprawna płatność rachunku zostaje zapisana i obciąża konto.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Konto testowe ma środki; dostępny jest testowy dostawca i środowisko płatności bez rzeczywistego obciążenia.
- **Dane testowe:** Dostawca **VB Water**; kwota zgodna z ustalonymi regułami płatności.

**Kroki:**
1. Otwórz **Bills Payment**.
2. Wybierz dostawcę, wprowadź dane płatności i wybierz konto testowe jako źródło środków.
3. Zatwierdź płatność.
4. Sprawdź potwierdzenie oraz wpis w **Recent Payments** lub **History**.

**Oczekiwany rezultat:**
- Płatność otrzymuje potwierdzenie i pojawia się w historii płatności.
- Saldo konta zmniejsza się o zapłaconą kwotę.

**Wymagane:** Testowy dostawca/płatność i możliwość resetu konta.

## TC-CARD-001 — Wyświetlenie przypisanej karty wirtualnej

- **Cel:** Potwierdzić, że lista kart pokazuje kartę przypisaną do użytkownika.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Konto testowe ma jedną kartę wirtualną utworzoną przez fixture.
- **Dane testowe:** Karta testowa z ustalonym statusem i danymi referencyjnymi.

**Kroki:**
1. Otwórz **Cards**.

**Oczekiwany rezultat:**
- Karta testowa jest widoczna na liście, a prezentowane dane odpowiadają fixture'owi.
- Dane karty są prezentowane zgodnie z wymaganym maskowaniem.

**Do potwierdzenia:** Aktualnie konto demonstracyjne pokazuje pusty stan **No virtual cards found** i nie udostępnia widocznej akcji utworzenia karty.

## TC-LOAN-001 — Złożenie wniosku o pożyczkę

- **Cel:** Potwierdzić przejście wniosku przez formularz i zapisanie go na koncie użytkownika.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Konto testowe może składać wnioski; aplikacja nie uruchamia rzeczywistej decyzji kredytowej.
- **Dane testowe:** **Personal Loan**, kwota 1 000 USD i okres 12 miesięcy (dolne granice widoczne w formularzu).

**Kroki:**
1. Otwórz **Loans** i wybierz **Personal Loan**.
2. Wprowadź wymagane dane wniosku i przejdź do podsumowania.
3. Zatwierdź wniosek w środowisku testowym.
4. Sprawdź sekcję **Your Applications**.

**Oczekiwany rezultat:**
- Wniosek zostaje potwierdzony i jest widoczny w **Your Applications** ze statusem zwróconym przez aplikację.

**Wymagane:** Testowa obsługa wniosków i możliwość resetu konta.

## TC-TOPUP-001 — Doładowanie konta w trybie testowym

- **Cel:** Potwierdzić, że zakończone doładowanie zwiększa saldo konta.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Konto testowe i bramka płatnicza w trybie sandbox.
- **Dane testowe:** Kwota 50 USD; poprawne dane płatnicze sandbox.

**Kroki:**
1. Otwórz **Top Up** i wybierz kwotę 50 USD.
2. Przejdź do bramki sandbox i zakończ testową płatność.
3. Wróć do aplikacji i sprawdź saldo.

**Oczekiwany rezultat:**
- Doładowanie otrzymuje potwierdzenie, a saldo zwiększa się o 50 USD.

**Wymagane:** Bramka płatnicza sandbox; nie używać prawdziwych danych płatniczych.

## TC-SETTINGS-001 — Zapisanie zmiany danych profilu

- **Cel:** Potwierdzić zapis i trwałość zmiany danych profilu użytkownika.
- **Priorytet:** Do ustalenia
- **Warunki wstępne:** Dedykowane konto testowe z możliwością przywrócenia danych.
- **Dane testowe:** Nowy, fikcyjny numer telefonu.

**Kroki:**
1. Otwórz **Settings** → **Profile & PII**.
2. Zmień numer telefonu i kliknij **Save Changes**.
3. Odśwież stronę i ponownie otwórz profil.

**Oczekiwany rezultat:**
- Aplikacja potwierdza zapis, a po odświeżeniu widoczny jest nowy numer telefonu.

**Wymagane:** Dedykowane konto; po teście przywróć dane lub odrzuć konto testowe.

## Wspólne zależności i ryzyka

- Przelewy, płatności, wnioski, doładowania i zapis profilu zmieniają stan konta. Wymagają izolowanych danych testowych i procedury resetu.
- Testy płatności wymagają trybu sandbox; nie wolno używać rzeczywistych danych płatniczych.
- Historia wymaga wcześniej przygotowanych transakcji. Rozbieżność między Dashboard a History wymaga wyjaśnienia przed ustaleniem testowych wartości oczekiwanych.
- Karta wymaga fixture'a, ponieważ bieżące konto demonstracyjne nie ma kart i interfejs nie pokazuje akcji ich tworzenia.
- Powyższe przypadki są propozycjami; priorytety i reguły biznesowe należy potwierdzić przed automatyzacją.

## Zautomatyzowane kontrole bez zapisu danych

Poniższe testy sprawdzają bezpieczne zachowania UI. Nie wykonują przelewów, płatności, wniosków ani zapisu profilu.

| ID | Zakładka | Sprawdzane zachowanie |
|---|---|---|
| TC-DASH-002 | Dashboard | Link **View All** otwiera historię transakcji. |
| TC-TRANSFER-002 | Transfer | Pusty formularz nie przechodzi dalej i wskazuje wymagany numer odbiorcy. |
| TC-HISTORY-002 | History | Wyszukiwanie bez wyników pokazuje pusty stan, a **Clear Filters** czyści wyszukiwanie. |
| TC-BILL-002 | Bills Payment | Pusty formularz wymaga wybrania dostawcy przed płatnością. |
| TC-CARD-002 | Cards | Dla konta bez kart wyświetlany jest pusty stan. |
| TC-LOAN-002 | Loans | Widoczne są dostępne typy pożyczek i ich zakresy. |
| TC-TOPUP-002 | Top Up | Szybki wybór kwoty ustawia wartość w polu doładowania. |
| TC-SETTINGS-002 | Settings | Można otworzyć formularz zmiany hasła bez jego zapisywania. |

**Automatyzacja:** [banking-read-only.spec.ts](./banking-read-only.spec.ts).
