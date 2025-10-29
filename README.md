# Aviasales Tickets — React + TypeScript + SCSS Modules

Выдача авиабилетов с тестового API Aviasales: фильтры по пересадкам, сортировки Самый дешевый / Самый быстрый / Оптимальный, постраничная догрузка по кнопке.

---

## ✨ Возможности

    •	Загрузка билетов через /search → searchId и циклическую догрузку /tickets?searchId=… до stop:true
    •	Фильтр по количеству пересадок (0–3) + переключатель Все
    •	Сортировки: Самый дешевый / Самый быстрый / Оптимальный
    •	Постепенный показ: кнопка «Показать ещё 5 билетов»
    •	Индикаторы состояния: лоадер и блок «Все билеты загружены»
    •	Стили через SCSS Modules

## 🧰 Стек

    •	React 18, TypeScript
    •	CRA (react-scripts 5)
    •	Redux Toolkit, react-redux, redux-thunk
    •	date-fns, react-spinners (BarLoader)
    •	ESLint + Prettier

## 🚀 Демо

Развёрнуто на Vercel:  
**<https://aviasales-app-new.vercel.app/>**

---

## 🛠 Как запустить

```bash
# установка
npm i

# dev-сервер
npm start

# сборка
npm run build
```
