---

# Flask i18n and Timezone Handling

This project is a simple Flask application that demonstrates internationalization (i18n) and timezone management using Flask-Babel. It supports multiple languages and timezones, allowing the user to set preferences through URL parameters or request headers.

## Features

- **Localization (i18n):** Supports multiple languages, specifically English and French.
- **Timezone Support:** Allows for timezone handling based on user preferences or the default timezone (UTC).
- **User-Based Locale and Timezone Settings:** Users can specify their locale and timezone, which will be applied globally in the application.
- **Current Time Display:** Displays the current time based on the user's timezone and locale settings.

## Technologies Used

- **Flask:** A lightweight web framework for Python.
- **Flask-Babel:** Provides support for internationalization and localization.
- **Pytz:** A Python library to work with timezones.
- **Jinja2:** Templating engine used by Flask for rendering HTML templates.

## Setup and Installation

1. **Clone the repository:**
    ```bash
    git clone <repository-url>
    cd <repository-folder>
    ```

2. **Install dependencies:**
    ```bash
    pip3 install -r requirements.txt
    ```

3. **Run the Flask app:**
    ```bash
    python3 app.py
    ```

The application will run on `http://0.0.0.0:5000` by default.

## Configuration

The app supports the following configuration options:

- **Supported Languages:** English (`en`), French (`fr`).
- **Default Locale:** English (`en`).
- **Default Timezone:** UTC.

You can change the language and timezone by using the following URL parameters:

- `locale`: Set the language preference (e.g., `?locale=fr` for French).
- `timezone`: Set the timezone preference (e.g., `?timezone=Europe/Paris`).

## Example

- **Change language to French:**
    ```
    http://localhost:5000/?locale=fr
    ```

- **Change timezone to Paris:**
    ```
    http://localhost:5000/?timezone=Europe/Paris
    ```

## File Structure

```
<project-root>/
│
├── app.py             # Main Flask application
├── templates/
│   ├── index.html     # HTML template
└── requirements.txt   # Project dependencies
```

## License

This project is licensed under the MIT License.

---
