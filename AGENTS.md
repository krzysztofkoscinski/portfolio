# Kontrakt współpracy

## Komunikacja i decyzje
- Domyślnie komunikuj się ze mną po polsku. Nazwy kodu, API i komunikaty narzędzi pozostaw w oryginalnym języku, gdy wymaga tego precyzja.
- Stawiaj na rzeczowy krytycyzm zamiast automatycznego potwierdzania moich założeń. Wskazuj ryzyka i uzasadniaj odmienne rekomendacje.
- Nie zgaduj. Gdy brakuje informacji potrzebnej do bezpiecznej lub poprawnej decyzji, krótko dopytaj. Wyraźnie oddzielaj fakty od założeń.

## Rozumienie i zakres zmian
- Przed zmianą sprawdź istniejącą implementację, jej sposób działania, powiązane testy oraz stan niezacommitowanych zmian. Traktuj cudze i wcześniejsze zmiany jako nienaruszalne.
- Bądź precyzyjny: zmieniaj tylko to, co jest konieczne do realizacji zadania. Nie rób niezwiązanych porządków ani refaktoryzacji.
- Jeśli niejasność wpływa na zakres lub zachowanie produktu, dopytaj przed wyborem rozwiązania.

## Jakość i testowanie
- Gdy ESLint jest skonfigurowany, utrzymuj go w czystym stanie. Nie dodawaj ani nie rozszerzaj ignorów, wyłączeń reguł czy dyrektyw ESLint bez mojej wyraźnej zgody.
- W dłuższym zadaniu uruchamiaj lint na zakończenie i po uzgodnionych kamieniach milowych, nie po każdym kroku. Poza tym waliduj właściwy fragment zadania najtańszym adekwatnym testem.
- Dla zachowań interfejsu stosuj adekwatne testy UI w Playwright. Sprawdzaj zachowanie widoczne dla użytkownika, nie szczegóły implementacji.
- Dla API dodawaj lub uruchamiaj testy API adekwatne do zmienianego kontraktu, w tym odpowiedzi i istotne scenariusze błędów. Korzystaj z istniejącego stosu projektu; nie zakładaj, że API już istnieje.
- Po zmianach uruchom adekwatną walidację, np. testy, lint, typecheck lub build, zależnie od dostępnych skryptów i zakresu. Jeśli czegoś nie da się uruchomić, powiedz dlaczego; nie przedstawiaj niewykonanych kontroli jako zaliczonych.

## Wspólne notatki
- Utrzymuj `PROJECT_KNOWLEDGE.md` jako zwięzłą bazę potwierdzonej wiedzy projektowej i produktowej. Aktualizuj ją, gdy odkryjesz trwałe, zweryfikowane informacje; oznaczaj niewiadome zamiast ich uzupełniać domysłami.
- Traktuj `TODO.md` jako wspólną, aktualną listę najbliższych zadań. Aktualizuj ją po zmianie priorytetów lub wykonaniu zadania i nie przekraczaj 40 linii.
