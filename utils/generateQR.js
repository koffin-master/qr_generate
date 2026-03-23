import QRCode from "qrcode";

const users = [
  { id: "usr_1", name: "Rahul" },
  { id: "usr_2", name: "Aman" },
  { id: "usr_3", name: "Sara" }
];

users.forEach(user => {
  const url = `http://192.168.29.226:3000/form.html?ref=${user.id}`;

  QRCode.toFile(`./${user.name}.png`, url, (err) => {
    if (err) throw err;
    console.log(`QR generated for ${user.name}`);
  });
});
