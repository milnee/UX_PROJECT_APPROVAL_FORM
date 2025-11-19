# COM321 - Electronic Prior Approval Form

A web-based form application for Ulster University students to submit travel and course expenditure approval requests. This project is part of the UX Design Module (COM321) coursework.

## Project Overview

This is a digital implementation of the paper-based "Application for Approval of Proposed Expenditure on a Visit or Course of Study" form. The form allows students to submit detailed information about their travel plans, cost breakdowns, and bank details for university approval.

## Technologies Used

- **HTML5** - Semantic markup and form structure
- **CSS3** - Custom styling and responsive design
- **JavaScript** - Form validation, calculations, and interactivity
- **Bootstrap 5.3.0** - Responsive grid system and UI components

## Features

### Form Sections
1. **Student Information**
   - PA Number
   - Student Number (B00 format)
   - Name, Email, School/Faculty/Campus

2. **Visit/Course Details**
   - Place of visit/course
   - Purpose of visit/course
   - Duration (FROM/TO dates)

3. **Bank Details**
   - Bank information for reimbursement
   - Support for UK and non-UK bank accounts
   - IBAN and SWIFT/BIC code fields

4. **Cost Breakdown**
   - Course Fee
   - Accommodation
   - Subsistence
   - Air/Boat Travel
   - Rail Travel
   - Coach/Taxi Fares
   - Sundries (with specification field)
   - Automatic total calculation (£ and p)

5. **Cost Code**
   - Cost code selection (T1020, T1022, T1022.5, T1022.7)
   - Nominal code selection (80100, 80200, 80300)

6. **Signature**
   - Digital signature field
   - Date field

### UX Features
- Real-time form validation with visual feedback
- Automatic cost calculation (pounds and pence)
- Date validation (end date must be after start date)
- Subsistence validation (max £25.00 per day)
- Accommodation validation (max £120 per night)
- Save draft functionality (localStorage)
- Load saved draft on page reload
- Progress indicator showing form completion
- Responsive design for mobile, tablet, and desktop
- Clear error messages and user guidance

## File Structure

```
UX_WebsiteProject/
├── index.html          # Main HTML file
├── styles.css          # Custom CSS styling
├── script.js           # JavaScript functionality
├── README.md           # Project documentation
└── REQUIREMENTS/       # Course specification files
    ├── HANDBOOK
    └── SPECIFICATION
```

## How to Use

1. **Open the form**
   - Simply open `index.html` in a web browser
   - No server setup required

2. **Fill out the form**
   - Complete all required fields (marked with *)
   - Enter cost breakdowns - totals calculate automatically
   - Select appropriate cost codes and nominal codes

3. **Save draft**
   - Click "Save as Draft" to save progress locally
   - Draft will be loaded automatically on next visit

4. **Submit**
   - Click "Submit for Approval" when complete
   - Form validates all fields before submission
   - Success message displays with reference number

## Form Validation

- **Required fields**: Name, Email, School/Faculty/Campus, Place, Purpose, Dates, Signature, Date
- **Email format**: Valid email address required
- **Date validation**: End date must be after start date
- **Cost validation**: 
  - Subsistence maximum: £25.00 per day
  - Accommodation maximum: £120 per night
- **Student Number**: 5 digits (B00 prefix)
- **PA Number**: 5 digits
- **Sort Code**: 6 digits

## Browser Compatibility

- Chrome (recommended)
- Firefox
- Safari
- Edge

## Course Information

- **Module**: COM321 - UX Design
- **Module Coordinator**: Dr Deepika Nikam
- **Academic Year**: 2025/26
- **Coursework**: Coursework 2 - UX Project

## Project Requirements

This project was developed according to the specification requirements:
- Hand-crafted code (no WYSIWYG editors)
- HTML5, CSS3, JavaScript, and Bootstrap only
- Front-end functionality demonstrating full UX capabilities
- Based on the paper-based Prior Approval Form (Figure 1)

## Notes

- Subsistence: Maximum of £25.00 per day
- Hotel/Overnight Accommodation: Maximum of £120 per night
- Nominal code options: 80100, 80200, 80300
- Cost code options: T1020, T1022, T1022.5, T1022.7

## Author

Developed as part of COM321 UX Design coursework at Ulster University.

## License

This project is part of academic coursework and is not intended for commercial use.

# UX_PROJECT_APPROVAL_FORM
