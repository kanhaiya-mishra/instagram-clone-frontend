import React from 'react';
import InstaPost from '../../components/insta-post-component/insta-post';

const Home = () => {
    return (
        <div>
            <InstaPost imageURL="https://www.instagram.com/static/images/jobs/workatphotos_4.jpg/1efd9a6dd7df.jpg" caption="this is the first post!" username="kanhaiya.10" />
            <InstaPost imageURL="https://www.instagram.com/static/images/jobs/workatphotos_5.jpg/412816ad3edb.jpg" caption="this is the second post!" username="shubham" />
            <InstaPost imageURL="https://www.instagram.com/static/images/jobs/workatphotos_3.jpg/c8353fd3116b.jpg" caption="this is the third post!" username="nandlal" />
            <InstaPost imageURL="https://www.instagram.com/static/images/jobs/workatphotos_7.jpg/0c3d6c05a0ae.jpg" caption="this is the fourth post!" username="deepti" />
            <InstaPost imageURL="https://www.instagram.com/static/images/jobs/workatphotos_2.jpg/3cdec60281cf.jpg" caption="this is the fifth post!" username="nagababa" />
        </div>
    )
}

export default Home;