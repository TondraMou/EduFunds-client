import { Helmet } from 'react-helmet-async';
import AddScholarshipForm from '../../../components/Form/AddScholarshipForm';
import { imageUpload } from '../../../api/utils';
import useAuth from '../../../hooks/useAuth';
import { useState } from 'react';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import toast from 'react-hot-toast';

const AddScholarship = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [uploadImage, setUploadImage] = useState({
    image: { name: 'Upload University Logo' },
  });
  const [loading, setLoading] = useState(false);

  // handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const form = e.target;

    // Extract form values
    const scholarshipName = form.scholarshipName.value;
    const universityName = form.universityName.value;
    const country = form.country.value;
    const city = form.city.value;
    const degree = form.degree.value;
    const subjectCategory = form.subjectCategory.value;
    const scholarshipCategory = form.scholarshipCategory.value;
    const tuitionFees = form.tuitionFees.value ? parseFloat(form.tuitionFees.value) : null;
    const applicationFees = parseFloat(form.applicationFees.value);
    const serviceCharge = parseFloat(form.serviceCharge.value);
    const applicationDeadline = form.applicationDeadline.value;
    const worldRank = form.worldRank.value;
    const postDate = new Date().toISOString(); // Current date as post date
    const image = form.image.files[0];

    // Upload image and get URL
    const imageUrl = await imageUpload(image);

    // Create scholarship data object
    const scholarshipData = {
      scholarshipName,
      universityName,
      country,
      city,
      degree,
      subjectCategory,
      scholarshipCategory,
      tuitionFees,
      applicationFees,
      serviceCharge,
      applicationDeadline,
      worldRank: parseInt(worldRank),
      postDate,
      addedBy: {
        name: user?.displayName,
        email: user?.email,
        photo: user?.photoURL,
      },
      image: imageUrl,
    };

    console.table(scholarshipData);

    // Save scholarship in the database
    try {
      await axiosSecure.post('/scholarships', scholarshipData);
      toast.success('Scholarship Added Successfully!');
      form.reset();
      setUploadImage({ image: { name: 'Upload University Logo' } });
    } catch (err) {
      console.error(err);
      toast.error('Failed to add scholarship. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Helmet>
        <title>Add Scholarship | Dashboard</title>
      </Helmet>

      {/* Form */}
      <AddScholarshipForm
        handleSubmit={handleSubmit}
        uploadImage={uploadImage}
        setUploadImage={setUploadImage}
        loading={loading}
      />
    </div>
  );
};

export default AddScholarship;