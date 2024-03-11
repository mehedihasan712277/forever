import React, { useContext, useState } from 'react'
import { AuthContext } from '../../auxiliary/AuthProvider';
import axios from 'axios';

const EditProfile = () => {
    const { user, changeY } = useContext(AuthContext);
    const [district, setDistrict] = useState([]);
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




    const handleEdit = (event) => {
        event.preventDefault();
        const form = event.target;
        const house = form.house.value;
        const policeStation = form.policeStation.value;
        const district = form.district.value;
        const division = form.division.value;
        const phone = form.phone.value;

        const address = {
            userId: user.uid,
            userName: user.displayName,
            userEmail: user.email,
            house,
            policeStation,
            district,
            division,
            phone,
        }

        axios.post(`https://server-forever.vercel.app/userAddress`, address)
            .then(res => {
                form.reset();
                changeY();
            })
    }
    return (
        <>
            <div>
                <form className='flex flex-col gap-2 items-center pt-6 pb-20' onSubmit={handleEdit}>
                    <p>Set your address for fast order process</p>
                    {/* <p className='font-semibold text-2xl mb-6'>Enter your address here</p> */}
                    <input className='bg-blue-100 p-2 rounded-sm w-64 mm:w-72' name="house" type="text" placeholder='House & local area name' required />
                    <input className='bg-blue-100 p-2 rounded-sm w-64 mm:w-72' name="policeStation" type="text" placeholder='Police Station' required />
                    {/* <input className='bg-blue-100 p-2 rounded-sm w-64 mm:w-72' name="district" type="text" placeholder='District' required /> */}
                    {/* <input className='bg-blue-100 p-2 rounded-sm w-64 mm:w-72' name="division" type="text" placeholder='Division' required /> */}

                    <div className='flex justify-between w-64 mm:w-72'>
                        <select name="division" onChange={selecDistrict} required>
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

                        <select name="district" required>
                            <option value="">Select district</option>
                            {
                                district.map(ele => {
                                    return <option key={ele} value={ele}>{ele.slice(1)}</option>
                                })
                            }
                        </select>
                    </div >


                    <input className='bg-blue-100 p-2 rounded-sm w-64 mm:w-72' name="phone" type="number" placeholder='Phone number' required />
                    <button type='submit' className='btn btn-neutral btn-outline'>Submit</button>
                </form>
            </div>
        </>
    )
}

export default EditProfile