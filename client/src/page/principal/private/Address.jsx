import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2';
import { AuthContext } from '../../auxiliary/AuthProvider';

const Address = () => {
    const { user, changeX } = useContext(AuthContext)
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const [district, setDistrict] = useState([]);
    const state = location.state;
    const navigate = useNavigate();



    useEffect(() => {
        window.scrollTo(0, 0);
        axios.get(`https://server-forever.vercel.app/userAddress/${user.uid}`)
            .then(res => {
                setData(res.data);
                setLoading(false);
            })
    }, [])
    if (loading) {
        return <div className='h-screen flex justify-center items-center'>loading...</div>
    }
    const districtData = [
        "1Dhaka",
        "1Faridpur",
        "1Gazipur",
        "1Gopalganj",
        "1Kishoreganj",
        "1Madaripur",
        "1Manikganj",
        "1Munshiganj",
        "1Narayanganj",
        "1Narsingdi",
        "1Rajbari",
        "1Shariatpur",
        "1Tangail",


        "2Bandarban",
        "2Brahmanbaria",
        "2Chandpur",
        "2Chittagong",
        "2Comilla",
        "2Cox's Bazar",
        "2Feni",
        "2Khagrachari",
        "2Lakshmipur",
        "2Noakhali",
        "2Rangamati",


        "3Bagerhat",
        "3Chuadanga",
        "3Jessore",
        "3Jhenaidah",
        "3Khulna",
        "3Kushtia",
        "3Magura",
        "3Meherpur",
        "3Narail",
        "3Satkhira",


        "4Bogura",
        "4Chapainawabganj",
        "4Joypurhat",
        "4Naogaon",
        "4Natore",
        "4Pabna",
        "4Rajshahi",
        "4Sirajganj",


        "5Barguna",
        "5Barisal",
        "5Bhola",
        "5Jhalokathi",
        "5Patuakhali",
        "5Pirojpur",


        "6Habiganj",
        "6Moulvibazar",
        "6Sunamganj",
        "6Sylhet",


        "7Dinajpur",
        "7Gaibandha",
        "7Kurigram",
        "7Lalmonirhat",
        "7Nilphamari",
        "7Panchagarh",
        "7Rangpur",
        "7Thakurgaon",


        "8Jamalpur",
        "8Mymensingh",
        "8Netrokona",
        "8Sherpur"
    ]
    const selecDistrict = (event) => {
        const division = event.target.value;
        if (division) {
            const datas = districtData.filter(ele => ele.includes(division))
            setDistrict(datas);
        }
        else {
            setDistrict([])
        }
    }

    // delete ytem after it is ordered------------------
    const handleDeleteCartAfterBuy = (id) => {
        let sum = 0;
        id.map(ele => {
            axios.delete(`https://server-forever.vercel.app/cart/${ele}`)
                .then(res => {
                    sum += res.data.deletedCount
                    console.log(id.length);
                    if (sum === id.length) {
                        changeX();
                    }
                })
        });
    }

    // post item to order collection--------------------
    const handleOrder = (event) => {
        event.preventDefault();
        const form = event.target;
        const house = form.house.value;
        const policeStation = form.policeStation.value;
        const district = form.district.value;
        const division = form.division.value;
        const phone = form.phone.value;


        //code for getting date -------------------
        const currentDate = new Date();
        const year = currentDate.getFullYear();
        const month = String(currentDate.getMonth() + 1).padStart(2, '0');
        const day = String(currentDate.getDate()).padStart(2, '0');

        const date = `${day}-${month}-${year}`;
        const now = Date.now()


        // code for getting time----------------------
        let hours = currentDate.getHours();
        const minutes = currentDate.getMinutes();
        const meridiem = hours >= 12 ? 'PM' : 'AM';
        // Convert hours to 12-hour format
        hours = hours % 12;
        hours = hours ? hours : 12; // '0' should be converted to '12' for 12-hour format
        // Add leading zeros if hours or minutes are single digits
        const hoursStr = hours < 10 ? `0${hours}` : `${hours}`;
        const minutesStr = minutes < 10 ? `0${minutes}` : `${minutes}`;

        const time = `${hoursStr}:${minutesStr} ${meridiem}`;


        const addressInfo = {
            userId: user.uid,
            tuid: `${user.uid}${now}`,
            userName: user.displayName,
            userEmail: user.email,
            address: {
                house,
                policeStation,
                district,
                division,
                phone,
                date,
                time
            }
        }

        const orderedData = state.info.map(ele => {
            let obj = {
                cartId: ele._id,
                productName: ele.productName,
                description: ele.description,
                img1: ele.img1,
                img2: ele.img2,
                img3: ele.img3,
                img4: ele.img4,
                regularPrice: ele.regularPrice,
                reducedPrice: ele.reducedPrice,
                quantity: ele.quantity,
                isSelected: ele.isSelected,
                productId: ele.productId,
                status: "placed"
            }
            return { ...obj, ...addressInfo, totalPrice: state.price }
        })
        if (district.includes(division)) {
            axios.post(`https://server-forever.vercel.app/order`, orderedData)
                .then(res => {
                    Swal.fire({
                        title: "Thank you",
                        text: "Your order is placed successfully",
                        icon: "success"
                    });
                    navigate("/order")
                    const cartId = orderedData.map(ele => ele.cartId);
                    handleDeleteCartAfterBuy(cartId);
                })
        }
        else {
            Swal.fire({
                title: "Opps",
                text: "Select the district correctly",
                icon: "error"
            })
        }
    }
    return (
        <>
            <div className='min-h-[70vh]'>
                <form className='flex flex-col gap-2 items-center pt-6 pb-20' onSubmit={handleOrder}>
                    <p className='font-semibold text-2xl mb-6'>Enter your address here</p>
                    <input className='bg-blue-100 p-2 rounded-sm w-80' defaultValue={data?.house} name="house" type="text" placeholder='House & local area name' required />
                    <input className='bg-blue-100 p-2 rounded-sm w-80' defaultValue={data?.policeStation} name="policeStation" type="text" placeholder='Police Station' required />
                    {/* <input className='bg-blue-100 p-2 rounded-sm w-80' name="district" type="text" placeholder='District' required /> */}
                    {/* <input className='bg-blue-100 p-2 rounded-sm w-80' name="division" type="text" placeholder='Division' required /> */}
                    <div className='flex justify-between w-80'>
                        <select name="division" onChange={selecDistrict} required defaultValue={data?.division}>
                            <option value="">Select division</option>
                            <option value="1">Dhaka</option>
                            <option value="2">Chittagong</option>
                            <option value="3">Khulna</option>
                            <option value="4">Rajshahi</option>
                            <option value="5">Barisal</option>
                            <option value="6">Sylhet</option>
                            <option value="7">Rangpur</option>
                            <option value="8">Mymensingh</option>
                        </select>

                        <select name="district" required defaultValue={data?.district}>
                            <option value="">Select district</option>
                            {data && <option value={data.district}>{data.district.slice(1)}</option>}
                            {
                                district.map(ele => {
                                    return <option key={ele} value={ele}>{ele.slice(1)}</option>
                                })
                            }
                        </select>
                    </div >

                    <input className='bg-blue-100 p-2 rounded-sm w-80' defaultValue={data?.phone} name="phone" type="number" placeholder='Phone number' required />
                    <button type='submit' className='btn btn-neutral btn-outline'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default Address