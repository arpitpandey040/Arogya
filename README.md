# ROGYA_PREDICTOR

<!-- HTML and CSS for Header -->
<div style="background-color: #F8F8F8; padding: 20px;">
  
  <p style="color: #666;">Predicting diseases with AI</p>
</div>

<!-- HTML and CSS for Features Section -->
<div style="background-color: #EFEFEF; padding: 20px;">
  <h2 style="color: #333;">Features</h2>
  <ul>
    <li>User Registration and Login</li>
    <li>Search for Nearby Health Stores</li>
    <li>Predict Diseases using Machine Learning Models</li>
    <li>Update User Details</li>
    <li>Send Symptom Data to Doctors for Consultation</li>
  </ul>
</div>

<!-- HTML and CSS for Technologies Section -->
<div style="background-color: #F8F8F8; padding: 20px;">
  <h2 style="color: #333;">Technologies Used</h2>
  <ul>
    <li>Node.js</li>
    <li>Express.js</li>
    <li>MongoDB (mongoose)</li>
    <li>Nodemailer</li>
    <li>Python 3.x</li>
    <li>Scikit-Learn</li>
    <li>Streamlit</li>
  </ul>
</div>
## Machine Learning Models

<div style="background-color: #EFEFEF; padding: 20px;">
  <h2 style="color: #333;">Machine Learning Models</h2>
  <p>The project incorporates machine learning models to predict diseases from symptoms. The models are trained using relevant datasets obtained from Kaggle. Here are the key details of the machine learning models used:</p>
  <ul>
    <li><strong>Diabetes Prediction Model:</strong> Predicts the likelihood of a person having diabetes based on input features such as pregnancies, glucose level, blood pressure, etc.</li>
    <li><strong>Heart Disease Prediction Model:</strong> Predicts the presence of heart disease based on features like age, sex, chest pain type, blood pressure, etc.</li>
    <li><strong>Parkinson's Prediction Model:</strong> Predicts the likelihood of Parkinson's disease based on various voice-related features.</li>
  </ul>
</div>

## Setup Instructions

<div style="background-color: #F8F8F8; padding: 20px;">
 
  <ol>
    <li>Clone the repository to your local machine.</li>
    <li>Install Node.js and Python 3.x if not already installed.</li>
    <li>Install the necessary Node.js packages using <code>npm install</code>.</li>
    <li>Set up a MongoDB database and update the connection URL in the <code>mongoose.connect</code> function.</li>
    <li>Configure the email settings in the nodemailer configuration for sending emails.</li>
    <li>Install the required Python packages using <code>pip install scikit-learn pandas numpy streamlit streamlit_option_menu</code>.</li>
    <li>Download the Kaggle datasets for disease prediction and save them in the appropriate directories.</li>
    <li>Run the Node.js application using <code>node app.js</code>.</li>
    <li>Run the Streamlit application using <code>streamlit run disease_prediction_app.py</code>.</li>
  </ol>
</div>

## Usage

1. Register or log in to the website.
2. Explore nearby health stores using the "Nearby Store" feature.
3. Predict diseases by selecting the desired disease prediction (Diabetes, Heart Disease, or Parkinson's Disease).
4. Enter the relevant symptom data and click the "Test Result" button to get predictions.
5. Update user details and send symptom data to doctors for consultation.




## Author

Sweety Rani

## Contact


- Email: sweetyrani005@gmail.com
