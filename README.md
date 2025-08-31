Cinema Booking App

Περιγραφή

Η εφαρμογή Cinema Booking App επιτρέπει στους χρήστες να περιηγηθούν σε διαθέσιμα σινεμά, να δουν τις ταινίες που προβάλλονται σε κάθε σινεμά και να κάνουν κρατήσεις για συγκεκριμένη ημερομηνία και ώρα. Η εφαρμογή διαθέτει τόσο frontend (React Native) όσο και backend (Node.js με Express και MySQL).

Η εφαρμογή χωρίζεται σε:
- Frontend: React Native για κινητές συσκευές.
- Backend: Node.js + Express για API.
- Βάση Δεδομένων: MySQL για αποθήκευση χρηστών, ταινιών, σινεμά και κρατήσεων.

---

Λειτουργικότητα

Προβολή λίστας σινεμά.

Προβολή ταινιών που προβάλλονται σε κάθε σινεμά.

Δημιουργία κρατήσεων για επιλεγμένη ταινία, σινεμά, ημερομηνία και ώρα.

Προβολή των προσωπικών κρατήσεων του χρήστη.

Σύνδεση και αποσύνδεση χρηστών μέσω token.

Προαπαιτούμενα

Node.js

MySQL ή MariaDB

Expo CLI για το frontend

---

Οδηγίες Εγκατάστασης


Backend

- Κλωνοποίηση του repository: `git clone <URL του repository>`
- Μετακίνηση στον φάκελο backend: `cd backend`
- Εγκατάσταση των dependencies: `npm install`
- Δημιουργία αρχείου .env στον φάκελο backend με τις παρακάτω ρυθμίσεις:
  ```env
  DB_HOST=localhost
  DB_USER=root
  DB_PASSWORD=το_δικό_σας_password
  DB_NAME=cinema_booking
  JWT_SECRET=ένα_τυχαίο_κλειδί
  ```
- Ρύθμιση της βάσης δεδομένων: `mysql -u root -p cinema_booking < database/cinema_booking.sql`

---

Frontend

- Μετακίνηση στον φάκελο frontend μέσω cmd: `cd frontend`
- Εγκαταστήστε τα dependencies: `npm install`
- Εκτέλεση της εφαρμογής μέσω Expo: `npm start`

Οδηγίες Εκτέλεσης

- Τρέξτε πρώτα τον backend server: `cd backend → node src/server.js`.
- Στη συνέχεια τρέξτε το frontend μέσω Expo: Σκανάρετε το QR code με το Expo Go app στο κινητό ή χρησιμοποιήστε emulator.
- Βεβαιωθείτε ότι το κινητό και ο backend server βρίσκονται στο ίδιο δίκτυο, ώστε να μπορεί η εφαρμογή να επικοινωνεί με το API.

