"use client";

import { useState, useEffect } from "react";
import DocumentUpload from '@/components/forms/DocumentUpload';
import { DocumentType } from '@/lib/types/document.types';
import DocumentPreview from "@/components/ui/DocumentPreview";
import { MdHistory } from "react-icons/md";
import { MdChat } from "react-icons/md";
import Image from 'next/image';

interface Document {
  _id: string;
  status: string;
  text?: string;
  stage?: number;
  documentType?: string;
  name?: string;
  url?: string;
  notes?: string;
}

interface StaffProgress {
  companies?: string[];
  currentStage?: number;
  exists?: boolean;
}

interface Props {
  documents: Document[];
  staffProgress: StaffProgress;
  setCurrentStage?: (stage: number) => void;
  setDocuments?: (docs: Document[]) => void;
  password?: string;
  fetchDocuments?: () => Promise<void>;
}

interface Reference {
  _id: string;
  text: string;
  status: string;
}

interface RefereeInputsProps {
  staffId: string;
  onSubmitSuccess: () => void;
  existingReferees?: Document[];
  companies?: string[];
}

interface DocumentSection {
  stage: number;
  type?: 'referee' | 'info';
  title: string;
  description: string | ((props: Props) => JSX.Element);
  documents?: Array<{
    type: DocumentType;
    title: string;
    description: string | ((props: Props) => JSX.Element);
  }>;
}

interface DocumentsByStage {
  [key: number]: Document[];
}

const DOCUMENT_SECTIONS = [
  {
    stage: 1,
    documents: [
      {
        type: DocumentType.CV,
        title: 'STAGE 2 of 12',
        description: (
          <>
           <strong style={{ fontSize: '1.2em' }}>Upload CV</strong>
           <br />
            Please attach a copy of your CV to include your education from primary School and ensure the start(Month&Year) and finish (Month&Year) of every entry either in education or employment are all CAPTURED as the event occurs in sequence , for this, you can simply attach the WORD format document to your email to us.
  P. S Please do not separate your education and employment in different segments as you would normally have in a regular CV. 
  
  We specifically require your RoyaCare CV to be listed in chronological form with everything listed as they occur from age 11. <a style={{ textDecoration: 'underline' }} href="https://cvguide.vercel.app/" target="_blank" rel="noopener noreferrer">Read More</a>
  
          </>
        )  },
      { type: DocumentType.PASSPORT_DATA, title: 'Upload Passport Data Page', description: (
        <>
       A scanned copy of your passport Data Page would be best. It is preferable that you scan the document in COLOUR showing the 4 corners of the document without any flashes covering any part
        </>
      ) },
      { type: DocumentType.PASSPORT_PHOTO, title: 'Upload Passport Photograph', description:(
        <>
         We require a clear passport sized photograph of you with a clear background.
        </>
      ) }
    ]
  },
  
  
  {
    stage: 2,
    type: 'referee',
    title: 'STAGE 3 of 12',
    description: (props: { documents: any[]; staffProgress: { companies?: any[] } }) => {
      const { documents, staffProgress } = props;
      const companies = staffProgress?.companies || [];
      
      if (!companies || companies.length === 0) {
        return (
          <>
            <strong style={{ fontSize: '1.5em' }}>STAGE 3 of 12</strong> <br />
            <strong style={{ fontSize: '1.2em' }}>Waiting for References to be Identified on your CV</strong>
            <br />
            <div className="mb-4">
              <p className="text-amber-600 font-medium">
                Your documents have been approved. Please wait while the admin assigns the companies for your references.
                Check back later.
              </p>
            </div>
          </>
        );
      }
      
      return (
        <>
          <strong style={{ fontSize: '1.5em' }}>STAGE 3 of 12</strong> <br />
          <strong style={{ fontSize: '1.2em' }}>Provide Referee Contact Information</strong>
          <br />
          <div className="mb-4">
            <p className="font-medium">Please provide referee contact information for the following companies:</p>
            <div className="p-3 bg-gray-50 rounded-md space-y-2">
              {companies.map((company, index) => (
                <div key={index} className="font-medium">
                  {index + 1}. {company}
                </div>
              ))}
            </div>
          </div>
          <button
  style={{ backgroundColor: "red", color: "white", display: "flex", alignItems: "center", gap: "8px" }}
  className="px-4 py-2 rounded-md"
  onClick={() => window.open("https://wa.me/447488812636?text=Hello,%20I%20am%20texting%20to%20request%20for%20a%20change%20of%20reference", "_blank")}
>
  <MdChat size={20} /> Contact Support
</button>
        </>
      );
    },
    refereeFields: (staffProgress: StaffProgress) => {
      const companies = staffProgress?.companies || [];
      return companies.map((company: string, index: number) => ({
        label: company,
        placeholder: 'Provide contact detail of REFEREE SUCH AS REFEREE NAME, POSITION OF REFEREE, REFEREE EMAIL ADDRESS, REFEREE PHONE NUMBER',
        textArea: true
      }));
    }
  },
  
    
    
    {
      stage: 3,
      documents: [
        { 
          type: DocumentType.RIGHT_TO_WORK, 
          title: 'STAGE 4 of 12',
          description: (props: Props) => { 
            const { setCurrentStage, setDocuments, password, fetchDocuments } = props;
            return (
              <> 
                <div className="mb-4">
                </div>
                <div className="mt-4">
                  <strong style={{ fontSize: '1.2em' }}>Share Code & Right to Work  </strong> 
                  <br />
                  If you are not a British or Irish citizen, Please use the link {' '}
                  <a href="https://right-to-work.service.gov.uk/prove/id-question"     
  
                     target="_blank" 
                     rel="noopener noreferrer"
                     className="text-blue-600 hover:text-blue-800 underline">
                    right-to-work.service.gov.uk/prove/id-question
                  </a> 
                  {' '}and insert our email Recruitment@royacare.co.uk when asked to share with your employer. 
                  
                  <li><strong>Student</strong> – Students to provide school documents which clearly shows the school's name and school logo, your fullname, course title, Start & finish dates and term time with vacation dates. </li>                
                  <li><strong>Skilled Worker</strong> – Kindly upload your <strong>COS</strong> and <strong>employment letter from your sponsor</strong>.</li>
                  <li><strong>Qualified Nurses</strong> – Kindly upload your <strong>NMC statement of entry</strong> and <strong>immunization records</strong>.</li>
                  <li><strong>Asylum Status Holder</strong> – Must send us a clear <strong>front and back copy of their ARC</strong> along with their <strong>full address on record with the Home Office</strong>.</li>
                </div>
                <details className="mt-4">
                  <summary className="text-red-600 cursor-pointer hover:text-red-700 flex items-center">
                    <svg 
                      className="w-4 h-4 mr-2" 
                      fill="none" 
                      stroke="currentColor" 
                      viewBox="0 0 24 24"
                    >
                      <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M9 5l7 7-7 7" 
                      />
                    </svg>
                    Click here if you are British or Irish
                  </summary>
                  <br /> <br />
                  
                  {/* <div className="mt-2"> */}
    
                    {/* <div className="relative w-full" style={{ height: '270px', overflow: 'hidden' }}>
                      <iframe
                        src="https://form.jotform.com/250153872113045"
                        style={{ 
                          width: '60%',
                          height: '1700px',
                          border: 'none',
                          marginBottom: '-1270px',
                          marginTop: '-95px'
                        }}
                      />
                   
                    </div>
  
                  </div> */}
                 
                </details> <br /> 
                <strong style={{ fontSize: '1.2em' }}>Upload Right to Work Below</strong> 
              </>
            );
          }
        }
      ]
    },
  
  
   
  
    {
      stage: 4,
      documents: [
        {
          type: DocumentType.GG_DATA,
          title: 'STAGE 5 of 12',
          description: (
            <>
             <strong style={{ fontSize: '1.2em' }}>Upload Proof of NATIONAL Insurance</strong>
             <br />
            Proof of NATIONAL Insurance in a government-issued document such as a letter from the Department for Work and Pensions or HM Revenue & Customs with your National Insurance Number, name, and address clearly visible.
            If you have a National Insurance card or BRP card, kindly take a clear picture of both the front and back of the card.
            </>
          )  },
        {
          type: DocumentType.KK_DATA,
          title: 'Upload Proof of Address 1',
          description: '(First page of UK Bank Statement issued in the current month) which confirms your name, your address, Bank name, sort code and account number. )'
        },
        { 
          type: DocumentType.LL_DATA, 
          title: 'Upload Proof of Address 2', 
          description: '(Second separate document which proof same address on your Bank Statement in the UK ie Utility Bill, Council Tax letter, UK DRIVERS licence(Full or provisional), School Letter confirming UK ADDRESS, GP LETTER, NI LETTER, LETTER FROM JOB CENTER. P.S It is important to note that the 2 separate documents in the UK must have the same name and address.)  ' 
        },
        { 
          type: DocumentType.QQ_DATA, 
          title: 'Upload Proof of Address from Abroad (Your Home Country)', 
          description: '(First page of Bank Statement or Utility Bill from Abroad if you have NOT LIVED IN UK for more than 5 years which confirms your name and address  ' 
        }
      ]
    },
  
    {
      stage: 5,
      documents: [
        {
          type: DocumentType.MM_DATA,
          title: 'STAGE 6 of 12',
          description: (
            <>
             <strong style={{ fontSize: '1.2em' }}>Kindly Follow the Instructions Below</strong>
             <br /> <br />
             <ul className="space-y-6">
               <li>
                 <div className="flex flex-col space-y-2">
                   <div>
                     <b>Enhanced DBS</b> on the Update service subscription if you live in <span style={{ color: 'red' }}>England or Wales</span> to cover both Child and Adult Workforce within the Care industry
                   </div>
                   <a
                     href="https://wa.me/447451245665?text=Hi,%20I%20am%20on%20stage%206.%20I%20would%20like%20to%20apply%20for%20Enhanced%20DBS%20with%20Update%20Service%20subscription%20for%20£95."
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md w-fit"
                   >
                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                     </svg>
                     Apply with us for £95
                   </a>
                 </div>
               </li>
               <li>
                 <div className="flex flex-col space-y-2">
                   <div>
                     <b>PVG</b> if you live in <span style={{ color: 'red' }}>Scotland</span> to cover both Child and Adult Workforce
                   </div>
                   <a
                     href="https://wa.me/447451245665?text=Hi,%20I%20am%20on%20stage%206.%20I%20would%20like%20to%20apply%20for%20PVG%20for%20£110."
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md w-fit"
                   >
                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                     </svg>
                     Apply with us for £110
                   </a>
                 </div>
               </li>
               <li>
                 <div className="flex flex-col space-y-2">
                   <div>
                     <b>ACCESSNI</b> if you live in <span style={{ color: 'red' }}>Northern Ireland</span> to cover both Child and Adult Workforce
                   </div>
                   <a
                     href="https://wa.me/447451245665?text=Hi,%20I%20am%20on%20stage%206.%20I%20would%20like%20to%20apply%20for%20ACCESSNI%20for%20£95."
                     target="_blank"
                     rel="noopener noreferrer"
                     className="inline-flex items-center px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-md w-fit"
                   >
                     <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                       <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                     </svg>
                     Apply with us for £95
                   </a>
                 </div>
               </li>
             </ul>
             <br />
             <strong style={{ fontSize: '1.2em' }}>Upload Disclosure Certificate Below</strong>
            </>
          )
        },
      ]
    },
  
    {
      stage: 6,
      documents: [
        {
          type: DocumentType.TRAINING_CERT,
          title: 'STAGE 7 of 12',
          description: (
            <>
              <strong style={{ fontSize: '1.2em' }}>Training Overview</strong>
              <br />
              <div className="space-y-4 mt-2">
                <div>
                  <p style={{ color: '#000000' }} className="font-semibold">1. Pre-recorded Video (6 hours)</p>
                  <p>Intended for both new or experienced individuals in the Care Industry.</p>
                  <p>There are 2 options to watch the recorded training video:</p>
                  
                  <div className="ml-4 mt-2">
                    <p><strong>Option 1</strong> - Use the link below</p>
                    <a href="https://bit.ly/3oklaLp" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                      https://bit.ly/3oklaLp
                    </a>
                    
                    <p className="mt-2"><strong>OR</strong></p>
                    
                    <p><strong>Option 2</strong> - CLICK on{' '}
                      <a href="https://t.me/JTDinc" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 underline">
                        https://t.me/JTDinc
                      </a>
                      {' '}to send me your First & LAST Name with the word TRAINING on Telegram & I will send you the downloaded version of the entire video
                    </p>
                  </div>
                </div>
  
                <div>
                  <p style={{ color: '#000000' }} className="font-semibold">Part 2 - Certification:</p>
                  <p>Either submit your own CPD/SkillsForCare - approved training certificates by <span style={{ color: 'red' }}>CareSkillsAcademy, Healthier Business Group or NHS</span> (you will be required to provide the contact DETAILS of conductor such as company name, contact name, email address and phone number of the training conductor as we are required to verify it's authenticity)</p>
                  
                  <p className="mt-2"><strong>OR</strong></p>
                  
                  <p>Complete the FULL training with us through CareSkillsAcademy within 48 hours on a day that suits you which can be discussed with the Operations Manager.{' '}
                    <a href="https://wa.me/+447451245665" className="text-blue-600 hover:text-blue-800 underline">Contact the Operations Manager</a> <br /> <br />
                  <strong style={{ fontSize: '1.2em' }}>Upload as many Training Certificates as you have</strong>
                  </p>
                </div>
              </div>
            </>
          )
        },
        { type: DocumentType.CPR_DATA, title: 'Upload CPR Test Certificate',
          description: (
            <>
            <strong style={{ fontSize: '1em' }}>We Only Accept the following English Language Proficiency Certificates</strong>
            <p>Kindly take our CPR Test Using <a href="https://revivr.bhf.org.uk/" className="text-blue-600 hover:underline">This Link</a> and Upload a screenshot of your test score.</p>
            </>
          )
         },

        { type: DocumentType.HH_DATA, title: 'Upload English Language Proficiency Certificate',
          description: (
            <>
            <strong style={{ fontSize: '1em' }}>We Only Accept the following English Language Proficiency Certificates</strong>
            <p>1. IELTS</p>
            <p>2. ECCTIS</p>
            <p>3. Cambridge English - Kindly take the test using <a href="https://english-level-test.com/english-test-2/"> https://english-level-test.com/english-test-2/</a> </p>
            </>
          )
         },
      ]
    },
    {
      stage: 7,
      type: 'info',
      title: 'STAGE 8 of 12',
      description: (
        <>
          <strong style={{ fontSize: '1.2em' }}>Induction</strong>
          <p>Kindly watch the 2hr Induction pre-recorded video with questions and ANSWERS to be conducted by the Operations Manager via Telegram.</p>
          <br />
          <p><i>ⓘ After watching the video, you will be prompted to an interface where you would answer the induction questions on telegram.</i></p>
          <br />
          <iframe 
            src="https://fast.wistia.net/embed/iframe/q64of5zuq9?seo=false&videoFoam=true&controlsVisibleOnLoad=false&playbar=false&fullscreenButton=false&playerColor=000000" 
            allow="autoplay; fullscreen" 
            width="100%" 
            height="800px" 
            id="wistia_video"
            
          ></iframe>

          <div id="quiz-message" style={{ display: 'none', marginTop: '20px', padding: '20px', backgroundColor: '#f0f0f0', border: '1px solid #ccc', borderRadius: '5px' }}>
            <h2 style={{ fontSize: '1.2em', fontWeight: 'bold', marginBottom: '15px' }}>RoyaCare Agency Induction Questions</h2>
            <p style={{ marginBottom: '10px' }}>This is to ensure that you are well informed about the process set out by the Agency</p>
            <p style={{ marginBottom: '15px' }}>🖊 16 questions · ⏱ 1 min · 🔀 answers</p>
            <p style={{ marginBottom: '10px' }}>Click on the link below to begin on Telegram:</p>
            <a 
              href="https://t.me/QuizBot?start=1ArGvTlz" 
              target="_blank" 
              rel="noopener noreferrer" 
              style={{ color: '#0066cc', textDecoration: 'underline', display: 'block', marginBottom: '15px' }}
            >
              t.me/QuizBot?start=1ArGvTlz
            </a>
            <p style={{ marginBottom: '10px' }}>
              If you are having trouble using the link, then please send me a message on Telegram:{' '}
              <a 
                href="https://t.me/JTDinc" 
                target="_blank" 
                rel="noopener noreferrer" 
                style={{ color: '#0066cc', textDecoration: 'underline' }}
              >
                https://t.me/JTDinc
              </a>
            </p>
            <p style={{ marginBottom: '15px' }}>Kindly let me know once you have completed the quiz by sending me the screenshot of your score on here please</p>
            <p style={{ color: '#ff0000', fontWeight: 'bold', marginBottom: '15px' }}>
              Warning - Do not share this link with anyone as the system will detect it and then would LOCK you out
            </p>
            <p>Thank you</p>
          </div>

          <script dangerouslySetInnerHTML={{
            __html: `
              window._wq = window._wq || [];
              _wq.push({
                id: 'q64of5zuq9',
                options: {
                  controlsVisibleOnLoad: false,
                  playbar: false,
                  fullscreenButton: false,
                  playerColor: '000000',
                  time: function(t) {
                    // Prevent seeking/fast-forwarding
                    if (this._lastTime && t > this._lastTime + 1.5) {
                      this.time(this._lastTime);
                    }
                    this._lastTime = t;
                  }
                },
                onReady: function(video) {
                  // Hide controls
                  video.controls(false);
                  
                  // Track actual watch time
                  let startTime = 0;
                  let totalWatchTime = 0;
                  
                  video.bind('play', function() {
                    startTime = Date.now();
                  });
                  
                  video.bind('pause', function() {
                    if (startTime > 0) {
                      totalWatchTime += (Date.now() - startTime) / 1000;
                      startTime = 0;
                    }
                  });
                  
                  video.bind('end', function() {
                    // Add final segment watch time
                    if (startTime > 0) {
                      totalWatchTime += (Date.now() - startTime) / 1000;
                    }
                    
                    // Only show quiz if they've watched most of the video (e.g., 90% of duration)
                    if (totalWatchTime >= video.duration() * 0.9) {
                      document.getElementById('quiz-message').style.display = 'block';
                    } else {
                      // Reset video if they haven't watched enough
                      video.time(0);
                      alert('Please watch the entire video before proceeding to the quiz.');
                    }
                  });
                }
              });
            `
          }} />
        </>
      )
    },
    
    
      {
        stage: 8,
        type: 'info',
        title: 'STAGE 9 of 12',
        description: (
          <>
          <strong style={{ fontSize: '1.2em' }}>INTERVIEW with Dr Lawal 
          </strong>
          <p>Ensure you have your original international Passport with you as Dr Lawal will be examining it during your video interview As discussed with the Operations Manager </p>
          <p>Ensure you have checked out our clients addresses in your region which is available using our service Finder tool <a href="https://royacare-service-addresses.vercel.app/" target="_blank" rel="noopener noreferrer">https://royacare-service-addresses.vercel.app/</a> and all you need to do is insert your postcode and all clients who are within 30mile radius to you will be displayed. You are expected to plan your journeys in advance accordingly using the Citymapper App <a href="https://citymapper.com/" target="_blank" rel="noopener noreferrer">https://citymapper.com/</a> as it helps you to know exactly the distance and costs before you accept a shift. 
          </p>
          
          </>

         
        )
      },
      {
        stage: 9,
        type: 'info',
        title: 'STAGE 10 of 12',
        description: (
          <>
          <strong style={{ fontSize: '1.2em' }}>DOCUMENTS SIGN OFF via Signaturely 
          </strong>
          <ol>
  <li>Code of Conduct</li>
  <li>HMRC</li>
  <li>Interview Checklist</li>
  <li>Working Time Regulations</li>
  <li>Zero Contract</li>
</ol>
          </>
        )
      },
      {
        stage: 10,
        type: 'info',
        title: 'STAGE 11 of 12',
        description: (
          <>
          <strong style={{ fontSize: '1.2em' }}> Booking Team planning CALL to discuss shift patterns and availability, Issue ID CARD & TIMESHEET 
          </strong>
          </>
        )
      },
      {
        stage: 11,
        
          
            type: 'info',
            title: 'STAGE 12 - STAFF PERSONAL PROFILE',
            description: (
              <>
                <p className="text-gray-600 mb-4">Congratulations on becoming compliant, you can now be booked for shifts. kindly proceed to your personal profile </p>
                <strong style={{ fontSize: '1.2em' }}>  </strong>
                <p> Click Here or copy this link and paste in your browser to Sign In to your personal profile</p>
                <a href="https://royacare-personal-profile.vercel.app/" target="_blank" rel="noopener noreferrer">https://royacare-personal-profile.vercel.app/</a>
                <div className="mt-6">
                  <a href="https://royacare-personal-profile.vercel.app/" target="_blank" rel="noopener noreferrer">
                  <button
                   className="text-white px-4 py-2 rounded hover:bg-blue-600" style={{ backgroundColor: "#0F1531" }}

                    onClick={() => {
                      // Add your button click logic here
                      console.log("Button clicked!");
                    }}
                  >
                    Sign In
                  </button></a>
                </div>
              </>
            )
          
      },

];

const RefereeInputs = ({ 
  staffId, 
  onSubmitSuccess, 
  existingReferees = [], 
  companies = [] 
}: RefereeInputsProps) => {
  const [referees, setReferees] = useState(
    companies.map((_, index) => 
      existingReferees[index]?.text || ''
    )
  );
  const [submitted, setSubmitted] = useState(
    existingReferees.map(ref => ref?.text ? true : false)
  );
  const [approvalStatus, setApprovalStatus] = useState(
    existingReferees.map(ref => ref?.status === 'appoved')
  );

  // Add useEffect to fetch existing referees on mount
  useEffect(() => {
    const fetchExistingReferees = async () => {
      try {
        const response = await fetch(`/api/staff/referees?staffId=${staffId}&stage=2`);
        if (response.ok) {
          const data = await response.json();
          // Update referees state with fetched data
          setReferees(
            companies.map((_, index) => 
              data[index]?.text || ''
            )
          );
          // Update submitted state
          setSubmitted(
            companies.map((_, index) => 
              data[index]?.text ? true : false
            )
          );
          // Update approval status
          setApprovalStatus(
            companies.map((_, index) => 
              data[index]?.status === 'approved'
            )
          );
        }
      } catch (error) {
        console.error('Error fetching referees:', error);
      }
    };

    fetchExistingReferees();
  }, [staffId, companies]); // Only run when staffId or companies change

  const handleSubmit = async () => {
    try {
      const response = await fetch('/api/staff/referees', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId,
          stage: 2,
          referees: referees.map((text, index) => ({ 
            text,
            status: 'pending',
            submittedAt: new Date(),
            company: companies[index]
          }))
        })
      });
      
      if (response.ok) {
        setSubmitted(referees.map(ref => ref ? true : false));
        onSubmitSuccess();
      }
    } catch (error) {
      console.error('Error submitting referees:', error);
    }
  };

  return (
    <div className="space-y-4">
      {companies.map((company, index) => (
        <div key={index}>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            {company}
          </label>
          <div 
            className={`w-full p-2 border rounded-md relative ${
              submitted[index] 
                ? approvalStatus[index]
                  ? 'bg-green-50 border-green-300 text-green-900'
                  : 'bg-red-50 border-red-300 text-red-900'
                : ''
            }`}
            style={{ minWidth: '500px', minHeight: '200px' }}
          >
            <div className="space-y-4">
              <div className="relative">
                <input
                  type="text"
                  value={referees[index]?.split('\n\n')[0] || ''}
                  onChange={(e) => {
                    if (!submitted[index]) {
                      const lines = referees[index]?.split('\n\n') || ['', '', '', ''];
                      lines[0] = e.target.value;
                      const newReferees = [...referees];
                      newReferees[index] = lines.join('\n\n');
                      setReferees(newReferees);
                    }
                  }}
                  disabled={submitted[index]}
                  className="w-full bg-transparent outline-none text-black"
                  placeholder="REFEREE NAME:"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={referees[index]?.split('\n\n')[1] || ''}
                  onChange={(e) => {
                    if (!submitted[index]) {
                      const lines = referees[index]?.split('\n\n') || ['', '', '', ''];
                      lines[1] = e.target.value;
                      const newReferees = [...referees];
                      newReferees[index] = lines.join('\n\n');
                      setReferees(newReferees);
                    }
                  }}
                  disabled={submitted[index]}
                  className="w-full bg-transparent outline-none"
                  placeholder="POSITION OF REFEREE:"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={referees[index]?.split('\n\n')[2] || ''}
                  onChange={(e) => {
                    if (!submitted[index]) {
                      const lines = referees[index]?.split('\n\n') || ['', '', '', ''];
                      lines[2] = e.target.value;
                      const newReferees = [...referees];
                      newReferees[index] = lines.join('\n\n');
                      setReferees(newReferees);
                    }
                  }}
                  disabled={submitted[index]}
                  className="w-full bg-transparent outline-none"
                  placeholder="REFEREE EMAIL ADDRESS:"
                />
              </div>
              <div className="relative">
                <input
                  type="text"
                  value={referees[index]?.split('\n\n')[3] || ''}
                  onChange={(e) => {
                    if (!submitted[index]) {
                      const lines = referees[index]?.split('\n\n') || ['', '', '', ''];
                      lines[3] = e.target.value;
                      const newReferees = [...referees];
                      newReferees[index] = lines.join('\n\n');
                      setReferees(newReferees);
                    }
                  }}
                  disabled={submitted[index]}
                  className="w-full bg-transparent outline-none"
                  placeholder="REFEREE PHONE NUMBER:"
                />
              </div>
            </div>
          </div>
          {submitted[index] && (
            <div className={`mt-1 text-sm ${
              approvalStatus[index]
                ? 'text-green-600'
                : 'text-red-600'
            }`}>
              {approvalStatus[index]
                ? 'Reference Recieved'
                : 'Successfully submitted! You will be notified via email once We have made contact with your referee.'}
            </div>
          )}
        </div>
      ))}
      <button
        onClick={handleSubmit}
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400"
        disabled={referees.every((_, i) => submitted[i])}
      >
        Submit Referee Details
      </button>
    </div>
  );
};

const initializeStaffProgress = async (staffId: string) => {
  try {
    const response = await fetch('/api/staff/progress', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        staffId,
        currentStage: 1,
        createdAt: new Date()
      })
    });
    if (!response.ok) {
      throw new Error('Failed to initialize staff progress');
    }
  } catch (error) {
    console.error('Error initializing staff progress:', error);
  }
};

const PersonalProfile = () => {
  const [password, setPassword] = useState("");
  const [staffName, setStaffName] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [documents, setDocuments] = useState<any[]>([]);
  const [currentStage, setCurrentStage] = useState(1);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [staffProgress, setStaffProgress] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  const LoadingSpinner = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-[#0F1531]"></div>
    </div>
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (password === "22476fh3e7f8" ||
        password === "ebaha478fi90" || 
        password === "umela478fi90" ||
        password === "wkwka478fi90" || 
        password === "23asy3648ji" ||
        password === "4444a478fi90" || 
        password === "3333" || 
        password === "123456" || 
        password === "somebody123" ||
        password === "Luke James" || 
        password === "12345678901" || 
        password === "kkkk5252101" || 
        password === "09876543210" || 
        password === "08101033175" || 
        password === "89843562789" || 
        password === "34665902385" ||
        password === "gg5yhqjuhs6" || 
        password === "khngvdfer" || 
        password === "jagbedg345c" || 
        password === "Daniel Majolagbe" || 
        password === "66778899001" || 
        password === "88888888889" || 
        password === "129999678901" || 
        password === "mmm20203333" ||
        password === "7yu65dgv091" ||
        password === "90128628239" ||
        password === "60568314644" ||
        password === "07945489531" ||
        password === "64513357754" ||
        password === "68159353209" ||
        password === "58939553856" ||
        password === "61883038908" ||
        password === "42519914204" ||
        password === "53658695697" ||
        password === "95670469657" ||
        password === "52207527166" ||
        password === "79512680409" ||
        password === "94378835803" ||
        password === "47477872484" ||
        password === "44310788714" ||
        password === "20084316553" ||
        password === "92034665393" ||
        password === "00519464081" ||
        password === "qhn6w9bs2qu" ||
        password === "61016255604" ||
        password === "21463351418" ||
        password === "87474930089" ||
        password === "96269866344" ||
        password === "44567945259" ||
        password === "ocrd2i1jjuf" ||
        password === "42145764470" ||
        password === "85886249055" ||
        password === "14430315529" ||
        password === "gzt9m5s4t2q" ||
        password === "70371746144" ||
        password === "btkgq323n4o" ||
        password === "89883559424" ||
        password === "17658983230" ||
        password === "71467196622" ||
        password === "50190284348" ||
        password === "87678754110" ||
        password === "37294345757" ||
        password === "38921587403" ||
        password === "71672656580" ||
        password === "90942636109" ||
        password === "05822343219" ||
        password === "67962795610" ||
        password === "75130838949" ||
        password === "15784167774" ||
        password === "grw4hr536x9" ||
        password === "34677704230" ||
        password === "13298451638" ||
        password === "42213933358" ||
        password === "rcr5x9ql1sb" ||
        password === "22055818203" ||
        password === "93366450194" ||
        password === "04573592171" ||
        password === "57988428753" ||
        password === "74672518606" ||
        password === "72899622101" ||
        password === "88696867835" ||
        password === "89206919305" ||
        password === "52606432322" ||
        password === "87343147453" ||
        password === "42852450718" ||
        password === "27212274988" ||
        password === "56608088291" ||
        password === "97213719394" ||
        password === "45112344452" ||
        password === "28482096997" ||
        password === "91891706724" ||
        password === "52826522461" ||
        password === "61030372034" ||
        password === "92477014697" ||
        password === "16047143673" ||
        password === "17062235695" ||
        password === "09455267795" ||
        password === "68796677253" ||
        password === "06327833379" ||
        password === "04202944333" ||
        password === "22232382198" ||
        password === "52377366253" ||
        password === "12004851907" ||
        password === "76370994007" ||
        password === "49697405243" ||
        password === "09638848075" ||
        password === "30097191103" ||
        password === "50315463932" ||
        password === "17463117114" ||
        password === "11952257909" ||
        password === "33551519087" ||
        password === "41894806160" ||
        password === "38117140422" ||
        password === "09374521177" ||
        password === "17587714288" ||
        password === "12825363210" ||
        password === "82007670230" ||
        password === "23762792843" ||
        password === "41904732523" ||
        password === "4htmdr4glm0" ||
        password === "14927452523" ||
        password === "35799775781" ||
        password === "15059363251" ||
        password === "25467372017" ||
        password === "26202728247" ||
        password === "28453037073" ||
        password === "17622077208" ||
        password === "89754208966" ||
        password === "01330310569" ||
        password === "46143214588" ||
        password === "75444397934" ||
        password === "di5uhjcvkfv" ||
        password === "21981312608" ||
        password === "47804713783" ||
        password === "yx5dzsxjb7y" ||
        password === "17034255481" ||
        password === "97374560790" ||
        password === "62900224886" ||
        password === "30008327000" ||
        password === "13186607437" ||
        password === "46501586826" ||
        password === "qxmn27veqsr" ||
        password === "ezdwy3ctd24" ||
        password === "23236359521" ||
        password === "16680466762" ||
        password === "86537073661" ||
        password === "23903967806" ||
        password === "00247432865" ||
        password === "29985823444" ||
        password === "75768635372" ||
        password === "57804815693" ||
        password === "mvff8onpfh4" ||
        password === "58182293361" ||
        password === "88648547121" ||
        password === "25373103330" ||
        password === "83300520684" ||
        password === "97166798304" ||
        password === "84828227902" ||
        password === "38778832032" ||
        password === "75710805100" ||
        password === "92881219163" ||
        password === "36116978615" ||
        password === "14yje272qvn" ||
        password === "16824018468" ||
        password === "38384589137" ||
        password === "21064420389" ||
        password === "mdte8r9q630" ||
        password === "s599nzateah" ||
        password === "57189916981" ||
        password === "yerjtvr2oi1" ||
        password === "66520697564" ||
        password === "08709316401" ||
        password === "59146177597" ||
        password === "87812481660" ||
        password === "86715472279" ||
        password === "12089539862" ||
        password === "86772077089" ||
        password === "61306247147" ||
        password === "1q1qenm54d1" ||
        password === "46069749762" ||
        password === "68882297959" ||
        password === "82817846939" ||
        password === "10299293519" ||
        password === "69737107856" ||
        password === "01604349877" ||
        password === "92355455085" ||
        password === "97030623525" ||
        password === "k7rf09e4xwf" ||
        password === "9se446sij2p" ||
        password === "39586458311" ||
        password === "57054176957" ||
        password === "27609685931" ||
        password === "34209951091" ||
        password === "58407013199" ||
        password === "00860168387" ||
        password === "6byexzd09y1" ||
        password === "25679857853" ||
        password === "23782906762" ||
        password === "99511391797" ||
        password === "57025100041" ||
        password === "31312405163" ||
        password === "72241994964" ||
        password === "72788574883" ||
        password === "27297128825" ||
        password === "75520449448" ||
        password === "61770670328" ||
        password === "23299536714" ||
        password === "53944722251" ||
        password === "99406204331" ||
        password === "14147603883" ||
        password === "09972029895" ||
        password === "95084841881" ||
        password === "73769555629" ||
        password === "36720329773" ||
        password === "99741149940" ||
        password === "35587761581" ||
        password === "91673651897" ||
        password === "g03v1877h8h" ||
        password === "84907510715" ||
        password === "90333133799" ||
        password === "xlbl15zgr9y" ||
        password === "08762738504" ||
        password === "71563498420" ||
        password === "67632872123" ||
        password === "16722140583" ||
        password === "49601882441" ||
        password === "08169118553" ||
        password === "87485310616" ||
        password === "01655693885" ||
        password === "49072663155" ||
        password === "63438198498" ||
        password === "88344968454" ||
        password === "71351444581" ||
        password === "54328763801" ||
        password === "71380954988" ||
        password === "97080402469" ||
        password === "37650422570" ||
        password === "91693399365" ||
        password === "49562308530" ||
        password === "46929796258" ||
        password === "03501596332" ||
        password === "94638291958" ||
        password === "58540792130" ||
        password === "76265971806" ||
        password === "29376269150" ||
        password === "53316621513" ||
        password === "17940246901" ||
        password === "10203268590" ||
        password === "41991283961" ||
        password === "76524715901" ||
        password === "njca53p8f2u" ||
        password === "08981315440" ||
        password === "46583431888" ||
        password === "04s6w47d577" ||
        password === "35549175194" ||
        password === "81103726279" ||
        password === "92691009061" ||
        password === "98914466831" ||
        password === "84472058919" ||
        password === "41410836358" ||
        password === "72044554870" ||
        password === "7e6e0jmupl4" ||
        password === "85109214641" ||
        password === "31276230696" ||
        password === "12767604228" ||
        password === "16273511504" ||
        password === "32670285033" ||
        password === "53418497781" ||
        password === "32101015113" ||
        password === "59175988934" ||
        password === "55091957173" ||
        password === "07642049782" ||
        password === "93489199803" ||
        password === "11572392776" ||
        password === "88032026321" ||
        password === "80763800906" ||
        password === "46895889252" ||
        password === "68982726383" ||
        password === "30085570764" ||
        password === "63646758225" ||
        password === "85743632534" ||
        password === "33647440333" ||
        password === "78735005668" ||
        password === "54324678586" ||
        password === "04128950530" ||
        password === "16184450953" ||
        password === "15914014467" ||
        password === "55052455064" ||
        password === "68992016593" ||
        password === "77132073601" ||
        password === "16943638533" ||
        password === "84279044871" ||
        password === "60776744244" ||
        password === "69339803526" ||
        password === "qilyyb6qqrc" ||
        password === "52329124383" ||
        password === "ubhjzpzbv53" ||
        password === "09881435242" ||
        password === "48716665116" ||
        password === "97155818066" ||
        password === "57655417803" ||
        password === "29715028437" ||
        password === "67936272764" ||
        password === "86525434384" ||
        password === "96036764332" ||
        password === "43820643281" ||
        password === "59319015338" ||
        password === "52670098260" ||
        password === "73662200592" ||
        password === "97051558732" ||
        password === "32389443648" ||
        password === "89992453052" ||
        password === "44008497383" ||
        password === "83230442607" ||
        password === "64078361531" ||
        password === "l7fv3dx0xib" ||
        password === "26109658462" ||
        password === "33125466566" ||
        password === "20657692435" ||
        password === "97201682485" ||
        password === "50846354738" ||
        password === "26659020209" ||
        password === "38575417892" ||
        password === "x0x44u9e6hi" ||
        password === "14857024193" ||
        password === "7k4tzol01rd" ||
        password === "66453975035" ||
        password === "81868757011" ||
        password === "98154363958" ||
        password === "01394612616" ||
        password === "65495729759" ||
        password === "74239464374" ||
        password === "oy7bz3b1u5m" ||
        password === "42143018803" ||
        password === "02228053433" ||
        password === "80484694237" ||
        password === "28791634225" ||
        password === "09890328463" ||
        password === "67983814948" ||
        password === "46262737386" ||
        password === "41546031671" ||
        password === "56074676188" ||
        password === "t43f32j4yc7" ||
        password === "61682463696" ||
        password === "21369009886" ||
        password === "75652848732" ||
        password === "10955564608" ||
        password === "99995407429" ||
        password === "67131763955" ||
        password === "59346370000" ||
        password === "95237567113" ||
        password === "96484655607" ||
        password === "55670696054" ||
        password === "45509617939" ||
        password === "80994036944" ||
        password === "07894953542" ||
        password === "09796389112" ||
        password === "90387637693" ||
        password === "59381292143" ||
        password === "rmdixe5ferk" ||
        password === "21788413499" ||
        password === "q0utejs1aaw" ||
        password === "17653058259" ||
        password === "43283688677" ||
        password === "47353155985" ||
        password === "29690734170" ||
        password === "63711740525" ||
        password === "64395767451" ||
        password === "43822650532" ||
        password === "29023488982" ||
        password === "28026344900" ||
        password === "18788490454" ||
        password === "42709512545" ||
        password === "29807098282" ||
        password === "05232450163" ||
        password === "46806081213" ||
        password === "27765470662" ||
        password === "91912680065" ||
        password === "67759270804" ||
        password === "01421919007" ||
        password === "40203843118" ||
        password === "40891205590" ||
        password === "87320659974" ||
        password === "09616900968" ||
        password === "98435403147" ||
        password === "08604354271" ||
        password === "81702702094" ||
        password === "28772566140" ||
        password === "23362963347" ||
        password === "59139224910" ||
        password === "38142809772" ||
        password === "78952585717" ||
        password === "08486289159" ||
        password === "11410851311" ||
        password === "90161003682" ||
        password === "61884881243" ||
        password === "kbt9il5tziz" ||
        password === "32059913751" ||
        password === "14883913776" ||
        password === "13722436508" ||
        password === "70187928353" ||
        password === "32435802143" ||
        password === "64311296462" ||
        password === "90123158991" ||
        password === "95815988683" ||
        password === "56301702605" ||
        password === "fg7m3uq0yjm" ||
        password === "09034061220" ||
        password === "77838471022" ||
        password === "52427704778" ||
        password === "04698486446" ||
        password === "31047905521" ||
        password === "92592649898" ||
        password === "nnuldsnx8yf" ||
        password === "49049906650" ||
        password === "50061946855" ||
        password === "59207346520" ||
        password === "07799622322" ||
        password === "38566340911" ||
        password === "uohls5hkkhu" ||
        password === "84162066848" ||
        password === "1emswybq75z" ||
        password === "45780672394" ||
        password === "65618543978" ||
        password === "15598591079" ||
        password === "41061850174" ||
        password === "18669628722" ||
        password === "09242464780" ||
        password === "53405266812" ||
        password === "26924964301" ||
        password === "92240551099" ||
        password === "16073014896" ||
        password === "ut3u814nn9u" ||
        password === "84027217939" ||
        password === "59569712295" ||
        password === "62135499634" ||
        password === "hh0ptlydm8z" ||
        password === "71058843752" ||
        password === "04214865517" ||
        password === "69432528792" ||
        password === "70953973509" ||
        password === "44628142801" ||
        password === "83707201282" ||
        password === "73565669501" ||
        password === "39612774078" ||
        password === "89829647014" ||
        password === "82766255409" ||
        password === "49237989282" ||
        password === "92408537832" ||
        password === "75720444102" ||
        password === "00669800101" ||
        password === "84031995602" ||
        password === "55266577417" ||
        password === "17495690449" ||
        password === "64171519646" ||
        password === "72969886210" ||
        password === "wsvia7qz48e" ||
        password === "ypayfgn4ewp" ||
        password === "23415795945" ||
        password === "47759915795" ||
        password === "26477027497" ||
        password === "oqe0f6q0gpl" ||
        password === "9h48tbemusr" ||
        password === "06692899748" ||
        password === "77701294936" ||
        password === "22094505187" ||
        password === "53750418248" ||
        password === "35894170351" ||
        password === "79434584636" ||
        password === "98505394710" ||
        password === "21970762215" ||
        password === "74096317279" ||
        password === "52501455011" ||
        password === "10382228525" ||
        password === "60111859165" ||
        password === "15208482026" ||
        password === "87679503512" ||
        password === "24200880969" ||
        password === "02361935170" ||
        password === "91951598295" ||
        password === "16642205647" ||
        password === "97810906158" ||
        password === "62767537767" ||
        password === "40713636167" ||
        password === "68416244335" ||
        password === "32541240938" ||
        password === "46284215276" ||
        password === "15320435898" ||
        password === "43109987694" ||
        password === "67172517585" ||
        password === "84926020308" ||
        password === "65948835173" ||
        password === "19665662714" ||
        password === "49223474160" ||
        password === "31056098048" ||
        password === "28501617092" ||
        password === "27479749790" ||
        password === "04984848807" ||
        password === "85670360329" ||
        password === "18353836101" ||
        password === "74108874739" ||
        password === "98834562720" ||
        password === "05173593257" ||
        password === "82193696560" ||
        password === "33713528758" ||
        password === "y0iyo08dxmv" ||
        password === "41548409956" ||
        password === "28391226322" ||
        password === "06099339586" ||
        password === "87600614533" ||
        password === "68000051224" ||
        password === "50482709625" ||
        password === "wd5xj9j3xe6" ||
        password === "73770430040" ||
        password === "90548537186" ||
        password === "14410649040" ||
        password === "44387812428" ||
        password === "02902340654" ||
        password === "68046778585" ||
        password === "28376789723" ||
        password === "11838965177" ||
        password === "17912538557" ||
        password === "19311945062" ||
        password === "52759085831" ||
        password === "17880656369" ||
        password === "11698013292" ||
        password === "92090629516" ||
        password === "00080578866" ||
        password === "91413817411" ||
        password === "30689464166" ||
        password === "03189814465" ||
        password === "13659078367" ||
        password === "07551705588" ||
        password === "07705360173" ||
        password === "96585513184" ||
        password === "79129816171" ||
        password === "03243999506" ||
        password === "030kivuu3o1" ||
        password === "46110318904" ||
        password === "51570667245" ||
        password === "07530142829" ||
        password === "62588522741" ||
        password === "94190034769" ||
        password === "83023759854" ||
        password === "00668398036" ||
        password === "98402375989" ||
        password === "10692659620" ||
        password === "23053619283" ||
        password === "14856685658" ||
        password === "77409685784" ||
        password === "61384840895" ||
        password === "00457624190" ||
        password === "38087714634" ||
        password === "78548721619" ||
        password === "62343738835" ||
        password === "51443257241" ||
        password === "71547658877" ||
        password === "06083887471" ||
        password === "80827147039" ||
        password === "82475280396" ||
        password === "35939850566") {
      setIsAuthenticated(true);
      setError("");
      
      try {
        // First save the staff profile with name
        await fetch('/api/staff/profile', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            staffId: password,
            name: staffName
          })
        });

        // Then proceed with the rest of the initialization
        const staffResponse = await fetch(`/api/staff/progress?staffId=${password}`);
        const staffData = await staffResponse.json();
        
        if (!staffData.exists) {
          await initializeStaffProgress(password);
          setCurrentStage(1);
        } else {
          setCurrentStage(staffData.currentStage);
        }
        
        await fetchDocuments();
      } catch (error) {
        console.error('Error initializing:', error);
      } finally {
        setIsLoading(false);
      }
    } else {
      setError("Invalid password. Please try again.");
      setIsLoading(false);
    }
  };

  // Modified fetchDocuments to properly track stage progression
  const fetchDocuments = async () => {
    try {
      // Fetch staff progress first
      const progressResponse = await fetch(`/api/staff/progress?staffId=${password}`);
      const progressData = await progressResponse.json();
      setStaffProgress(progressData);

      // Get documents
      const response = await fetch(`/api/staff/documents?staffId=${password}`);
      const data = await response.json();
      setDocuments(data.documents || []);

      // Calculate stage based on document approvals and companies assignment
      const documentsByStage = (data.documents as Document[]).reduce((acc: DocumentsByStage, doc: Document) => {
        if (!acc[doc.stage || 0]) acc[doc.stage || 0] = [];
        acc[doc.stage || 0].push(doc);
        return acc;
      }, {});

      let newStage = progressData.currentStage || 1;

      // Check stage 1 completion
      if (newStage === 1) {
        const stage1Docs = documentsByStage[1] || [];
        const stage1Required = 3;
        const stage1Approved = stage1Docs.filter((doc: Document) => doc.status === 'approved').length;

        // Only progress if exactly 3 documents are approved (not just submitted)
        if (stage1Approved === stage1Required) {
          newStage = 2;
          await updateStaffProgress(password, 2);
        } else {
          // Stay in stage 1 if not exactly 3 approved documents
          newStage = 1;
          await updateStaffProgress(password, 1);
        }
      }

      // Check stage 2 (referees) completion
      if (newStage === 2) {
        const refereeResponse = await fetch(`/api/staff/referees?staffId=${password}&stage=2`);
        const refereeData = await refereeResponse.json();
        const allRefereesApproved = refereeData.length === 5 && 
          refereeData.every((ref: Document) => ref.status === 'approved');

        if (allRefereesApproved) {
          newStage = 3;
          await updateStaffProgress(password, 3);
        }
      }

      // Check stage 3 completion
      if (newStage === 3) {
        const stage3Docs = documentsByStage[3] || [];
        const stage3Approved = stage3Docs.filter((doc: Document) => doc.status === 'approved').length;

        if (stage3Approved === 1) {
          newStage = 4;
          await updateStaffProgress(password, 4);
        }
      }

      // Check stage 4 completion
      if (newStage === 4) {
        const stage4Docs = documentsByStage[4] || [];
        const stage4Required = DOCUMENT_SECTIONS[3]?.documents?.length || 0;
        const stage4Approved = stage4Docs.filter((doc: Document) => doc.status === 'approved').length;

        if (stage4Approved === stage4Required) {
          newStage = 5;
          await updateStaffProgress(password, 5);
        }
      }

      // Check stage 5 completion
      if (newStage === 5) {
        const stage5Docs = documentsByStage[5] || [];
        const stage5Approved = stage5Docs.filter((doc: Document) => doc.status === 'approved').length;

        if (stage5Approved === 1) {
          newStage = 6;
          await updateStaffProgress(password, 6);
        }
      }

      // Check stage 6 completion
      if (newStage === 6) {
        const stage6Docs = documentsByStage[6] || [];
        const stage6Required = DOCUMENT_SECTIONS[5]?.documents?.length || 0;
        const stage6Approved = stage6Docs.filter((doc: Document) => doc.status === 'approved').length;

        if (stage6Approved === stage6Required) {
          newStage = 7;
          await updateStaffProgress(password, 7);
        }
      }

      // Set the current stage
      setCurrentStage(newStage);

    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  // Helper function to update staff progress
  const updateStaffProgress = async (staffId: string, stage: number) => {
    try {
      await fetch('/api/staff/progress', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          staffId,
          currentStage: stage
        })
      });
    } catch (error) {
      console.error('Error updating staff progress:', error);
    }
  };

  // Fetch documents when authenticated
  useEffect(() => {
    if (isAuthenticated) {
      fetchDocuments();
    }
  }, [isAuthenticated]);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'approved':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'declined':
        return 'text-red-600 bg-red-50 border-red-200';
      case 'pending':
      default:
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    }
  };

  const handleUploadSuccess = () => {
    setShowUploadSuccess(true);
    localStorage.setItem('uploadSuccess', 'true');
    setTimeout(() => {
      setShowUploadSuccess(false);
      localStorage.removeItem('uploadSuccess');
    }, 0.1 * 60 * 1000); // 1 minutes
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 px-4">
        <div className="max-w-md w-full space-y-6 bg-white p-8 rounded-lg shadow-md">
          <div>
            <div className="flex justify-center items-center">
              <Image src="/roya.png" alt="Logo" width={100} height={100} />
            </div>
            <h2 className="text-center text-2xl font-bold text-[#0F1531]">
              Staff Profile
            </h2>
            <p className="text-center text-sm text-gray-600 mt-2">
              Enter Your Details to Login
            </p>
          </div>
          <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                value={staffName}
                onChange={(e) => setStaffName(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F1531] focus:border-transparent mb-3"
                placeholder="Enter your first and Last name"
                required
              />
              <input
                type="text"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F1531] focus:border-transparent mb-3"
                placeholder="Enter Email Address"
              />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-[#0F1531] focus:border-transparent"
                placeholder="Password/ID"
              />
            </div>

            {error && <p className="text-red-500 text-sm text-center">{error}</p>}
            
            <div className="text-center">
              <a 
                href="https://google.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-[#0F1531] hover:text-blue-700 text-sm"
              >
                Forgot Password?
              </a>
            </div>

            <button
              type="submit"
              className="w-full py-2 px-4 bg-[#0F1531] text-white rounded-md hover:bg-[#1a2547] transition-colors duration-200"
            >
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="fixed top-0 left-0 w-full bg-[#0f1531] text-white p-4 text-center text-xl z-50">
        Royacare Agency 
      </nav>
      
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div className="container mx-auto px-4 pt-20">
          {showUploadSuccess && (
            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative">
              <span className="block sm:inline">File uploaded successfully!</span>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow-md p-6 mt-4">
            {(DOCUMENT_SECTIONS as DocumentSection[]).map((section) => (
              section.stage === currentStage && (
                <div key={section.stage} className="space-y-6">
                  {section.type === 'referee' ? (
                    <>
                      {typeof section.description === 'function' ? 
                        section.description({ documents, staffProgress, setCurrentStage, setDocuments, password, fetchDocuments }) : 
                        section.description}
                      {staffProgress?.companies?.length === 5 && (
                        <RefereeInputs
                          staffId={password}
                          onSubmitSuccess={fetchDocuments}
                          existingReferees={documents.filter(d => d.stage === 2)}
                          companies={staffProgress.companies}
                        />
                      )}
                    </>
                  ) : section.type === 'info' ? (
                    <div className="border-b pb-6">
                      <h2 className="text-xl font-bold mb-4">{section.title}</h2>
                      <div className="mb-4 text-gray-600">
                        {typeof section.description === 'function' 
                          ? section.description({ documents, staffProgress, setCurrentStage, setDocuments, password, fetchDocuments })
                          : section.description}
                      </div>
                    </div>
                  ) : (
                    section.documents?.map((doc) => {
                      const existingDoc = documents.find(d => 
                        d.stage === currentStage && 
                        d.documentType === doc.type
                      );
                      
                      return (
                        <div key={doc.type} className="border-b pb-6">
                          <h2 className="text-xl font-bold mb-4">{doc.title}</h2>
                          {typeof doc.description === 'function' ? (
                            doc.description({ documents, staffProgress, setCurrentStage, setDocuments, password, fetchDocuments })
                          ) : (
                            <div className="mb-4 text-gray-600">{doc.description}</div>
                          )}
                          <DocumentUpload 
                            staffId={password}
                            stage={currentStage}
                            documentType={doc.type}
                            onUploadSuccess={handleUploadSuccess}
                            existingDocument={existingDoc}
                          />
                        </div>
                      );
                    })
                  )}
                </div>
              )
            ))}
            
            {currentStage === 4 && (
              <div className="border-b pb-6">
                <br />
                <h2 className="text-xl font-bold mb-4">5 Years Address History</h2>
                <p>List the addresses with exact dates you have lived there for the last 5 years, including your current UK address. Ensure there are no gaps between your addresses if they are more than one in the last 5 years:</p>
                <ol className="list-decimal pl-5">
                  <li>
                    <strong>Current UK Address:</strong>  
                    Used From: e.g., March 2022
                  </li>
                  <li>
                    <strong>Second Address:</strong>  
                    Used From: e.g., January 2020  
                    Used To: Must be March 2022
                  </li>
                  <li>
                    <strong>Third Address:</strong>  
                    Used From: January 2015  
                    Used To: January 2020
                  </li>
                </ol>
                <p>In other words, ensure the same month and year you moved out from one address is entered as the same month and year you moved into your next address. This setup is to avoid any gaps in your address history.</p>
                <p>You can also add your address abroad if that's where you have lived too.</p>
                <div className="relative w-full" style={{ height: '500px', overflow: 'hidden' }}>
                  <iframe
                    id="JotFormIFrame-250131621571041"
                    title="Address History Form"
                    onLoad={(e) => {
                      if (window.parent) {
                        window.parent.scrollTo(0,0);
                      }
                    }}
                    allowTransparency={true}
                    allow="geolocation; microphone; camera; fullscreen"
                    src="https://form.jotform.com/250131621571041"
                    frameBorder="0"
                    style={{ 
                      width: '80%',
                      height: '600px',
                      border: 'none',
                      marginBottom: '-130px',
                      marginTop: '-30px'
                    }}
                    scrolling="no"
                  />
                </div>
              </div>
            )}
            
            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                <MdHistory className="text-[#0F1531] text-xl" />
                Upload History - You will Automatically Progress to the Next Stage Once the Documents requested above are Approved
              </h3>
              <p>Refresh Page to see updated list</p>
              {documents.length > 0 ? (
                Object.entries(
                  documents.reduce((acc: DocumentsByStage, doc: Document) => {
                    if (!acc[doc.stage || 0]) acc[doc.stage || 0] = [];
                    acc[doc.stage || 0].push(doc);
                    return acc;
                  }, {} as DocumentsByStage)
                )
                .sort(([stageA], [stageB]) => Number(stageA) - Number(stageB))
                .map(([stage, stageDocs]) => {
                  const typedDocs = stageDocs as Document[];
                  return (
                    <div key={stage} className="mb-6">
                      <h4 className="text-lg font-semibold mb-3 text-[#0F1531]">
                      <div className="border-b border-gray-300 my-4" />
                      </h4>
                      <div className="space-y-4">
                        {typedDocs.map((doc: Document) => (
                          <div key={doc._id} className="flex items-center justify-between p-4 border rounded-lg hover:shadow-md transition-shadow">
                            <div className="flex-grow">
                              <p className="font-medium">{doc.name}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <span className={`text-sm px-2 py-0.5 rounded-full border ${getStatusColor(doc.status)}`}>
                                  {doc.status.charAt(0).toUpperCase() + doc.status.slice(1)}
                                </span>
                              </div>
                              {doc.notes && (
                                <p className="text-sm text-gray-600 mt-1">
                                  Note: {doc.notes}
                                </p>
                              )}
                            </div>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => setPreviewUrl(doc.url || null)}
                                className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 border border-blue-200 rounded-md hover:bg-blue-50 flex items-center gap-1"
                              >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                                  <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                                  <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd" />
                                </svg>
                                View
                              </button>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-500">No documents uploaded yet</p>
              )}
            </div>
            
            <DocumentPreview
              url={previewUrl || ''}
              isOpen={!!previewUrl}
              onClose={() => setPreviewUrl(null)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalProfile;



