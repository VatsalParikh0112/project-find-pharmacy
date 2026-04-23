import { Component } from '@angular/core';

@Component({
  selector: 'app-section-3',
  imports: [],
  templateUrl: './section-3.html',
})
export class Section3 {
  public readonly steps = [
    {
      title: 'Enter Your Medicine Name & ZIP Code',
      desc1:
        'Start by typing the name of your prescription or over-the-counter medicine. Add your ZIP code so we can locate pharmacies near you.',
      desc2: 'Our system instantly scans nearby stores to find real-time availability.',
    },
    {
      title: 'Select Strength, Quantity & Preferences',
      desc1:
        'Refine your search by choosing the correct dosage, quantity, or formulation (tablet, syrup, injection, etc.).',
      desc2:
        'You can also filter pharmacies based on distance, availability, or special services like compounding.',
    },
    {
      title: 'View Nearby Pharmacies with Availability',
      desc1: 'Instantly see a list of pharmacies that have your medicine in stock.',
      desc2: 'Compare options based on distance, availability, and convenience — all in one place.',
    },
    {
      title: 'Connect & Visit with Confidence',
      desc1:
        'Get directions, contact details, and additional information about the pharmacy before you go.',
      desc2: 'Save time and ensure your medicine is ready when you arrive.',
    },
  ];
}
