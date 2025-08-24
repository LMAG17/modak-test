
# Prueba Técnica Modak - Aplicación de Productos

## Descripción / Description

**Español:**
Esta es una aplicación móvil desarrollada con React Native CLI que consume la API de DummyJSON - Products API para mostrar productos. Permite buscar, filtrar por categorías y ordenar por precio y calificación, ver detalles de cada producto y agregar recordatorios de compra al calendario del dispositivo. Además, utiliza notificaciones locales mediante Notifee. La aplicación implementa un módulo nativo tanto en Android como iOS para la integración con el calendario.

**English:**
This is a mobile application developed with React Native CLI that consumes the DummyJSON - Products API to display products. It allows searching, filtering by categories and sort by price and rate, viewing detailed product information, and adding purchase reminders to the device calendar. Additionally, it uses local notifications via Notifee and includes a native module for both Android and iOS to integrate with the calendar.

---

## Arquitectura / Architecture

**Español:**
La aplicación sigue una arquitectura basada en **Domain Driven Design (DDD) y Clean Architecture**, organizada en capas:

* **data**: API, mappers y fuentes de datos.
* **domain**: entidades y casos de uso.
* **presentation**: componentes de UI, hooks, navegación y módulos nativos.
* **notifications**: lógica de notificaciones locales.
* **screens**: pantallas de la aplicación.
* **store**: Redux Toolkit Query para manejo de estado y consultas.
* **utils**: funciones auxiliares.

**English:**
The app follows a **Domain Driven Design (DDD) and Clean Architecture** approach, organized in layers:

* **data**: API, mappers, and data sources.
* **domain**: entities and use cases.
* **presentation**: UI components, hooks, navigation, and native modules.
* **notifications**: local notification logic.
* **screens**: app screens.
* **store**: Redux Toolkit Query for state management and queries.
* **utils**: helper functions.

---

## Instalación / Installation

**Español:**

1. Clonar el repositorio.
2. Ejecutar `yarn` para instalar dependencias.
3. Si es iOS, ejecutar `cd ios && pod install`.
4. Ejecutar `yarn ios` o `yarn android` según la plataforma.

**English:**

1. Clone the repository.
2. Run `yarn` to install dependencies.
3. For iOS, run `cd ios && pod install`.
4. Run `yarn ios` or `yarn android` depending on your platform.

---

## Flujo de la Aplicación / App Flow

**Español:**

1. En la pantalla principal (`HomeScreen`) se muestran varios productos.
2. Se puede buscar y filtrar por categoría.
3. En la pantalla de detalle (`ProductDetailScreen`) se muestra información relevante del producto.
4. Se puede agregar un recordatorio en el calendario del dispositivo para comprar el producto.
5. Se envían notificaciones locales según recordatorios.

**English:**

1. On the main screen (`HomeScreen`) multiple products are displayed.
2. Users can search and filter by category.
3. On the product detail screen (`ProductDetailScreen`) relevant product information is shown.
4. Users can add a reminder to the device calendar to purchase the product.
5. Local notifications are sent according to reminders.

---

## Deep Links

**Español:**  
La aplicación soporta **deeplinks** para abrir productos directamente desde la URL:  

- **iOS:**  
  ```bash
  xcrun simctl openurl booted "myapp://product/22"
  ```

- **Android:**  
  ```bash
  adb shell am start -W -a android.intent.action.VIEW -d "myapp://product/20" com.modak
  ```

**English:**  
The app supports **deeplinks** to open products directly from a URL:  

- **iOS:**  
  ```bash
  xcrun simctl openurl booted "myapp://product/22"
  ```

- **Android:**  
  ```bash
  adb shell am start -W -a android.intent.action.VIEW -d "myapp://product/20" com.modak
  ```

---


## Pruebas / Testing

**Español:**
Se realizaron pruebas unitarias y de integración hasta alcanzar **100% de cobertura**, asegurando el correcto funcionamiento de los módulos críticos como: manejo de productos, casos de uso y notificaciones.

**English:**
Unit and integration tests were performed until **100% coverage** was achieved, ensuring the correct functionality of critical modules such as product handling, use cases, and notifications.

---

## Tecnologías / Technologies

* React Native CLI
* TypeScript
* Redux Toolkit Query
* Notifee (notificaciones locales)
* Módulos nativos Android e iOS
* DummyJSON - Products API

---

