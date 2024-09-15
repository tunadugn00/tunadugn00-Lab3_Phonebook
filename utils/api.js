import 'react-native-get-random-values';
import { v4 } from 'uuid';

const mapContact = contact => {
  const {
    name, picture, phone, cell, email, location, dob, gender
  } = contact;

  return {
    id: v4(),
    name: name.first + " " + name.last,
    avatar: picture.large,
    phone,
    cell,
    email,
    location: `${location.street.number} ${location.street.name}, ${location.city}, ${location.country}`,
    dob: new Date(dob.date).toLocaleDateString(), // Format dob to a readable date
    gender,
    favorite: Math.random() >= 0.5, // randomly generate favorite contacts
  };
};


const fetchContacts = async () => {
  const response = await fetch('https://randomuser.me/api/?results=100&seed=fullstackio');
  const contactData = await response.json();
  return contactData.results.map(mapContact);
};

const fetchUserContact = async () => {
  const response = await fetch('https://randomuser.me/api/?seed=fullstackio');
  const userData = await response.json();
  
  // Lấy thông tin người dùng gốc
  let user = userData.results[0];

  // Thay đổi thông tin người dùng theo ý mình
  user.name.first = "Mai"; // Đổi tên người dùng thành "Mai"
  user.name.last = "Tuấn Dũng";   // Đổi họ người dùng thành "Tuấn Dũng"
  user.phone = "0868-259-126"; // Đổi số điện thoại
  user.email = "2124801030178@student.tdmu.vn"; // Thay đổi email

  // Thay đổi địa chỉ
  user.location = {
    street: { number: "", name: "Dĩ An" },
    city: "Bình Dương",
    state: "Bình Dương",
    country: "VN",
    postcode: "12345",
  };

  // Thay đổi ngày sinh
  user.dob.date = "2003-06-01T00:00:00.000Z"; // Thay đổi ngày sinh

  // Thay đổi giới tính
  user.gender = "Male"; // Thay đổi giới tính

  // Thay đổi ảnh đại diện
  user.picture.large = "https://cdn.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_S.jpg"; // Đổi URL ảnh
  user.picture.medium = "https://cdn.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_S.jpg"; // Đổi URL ảnh trung bình
  user.picture.thumbnail = "https://cdn.outsideonline.com/wp-content/uploads/2023/03/Funny_Dog_S.jpg"; // Đổi URL ảnh thumbnail
  
  // Trả về thông tin người dùng đã được cập nhật
  return mapContact(user);
};




const fetchRandomContact = async () => {
  const response = await fetch('https://randomuser.me/api/');
  const userData = await response.json();
  return mapContact(userData.results[0]);
};

export { fetchContacts, fetchUserContact, fetchRandomContact };
