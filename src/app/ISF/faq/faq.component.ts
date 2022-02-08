import { Component, OnInit } from '@angular/core';
import { FaqItem } from '@app/core/interfaces';

@Component({
  selector: 'app-faq',
  templateUrl: './faq.component.html',
  styleUrls: ['./faq.component.scss']
})
export class FaqComponent implements OnInit {
  public faqList: FaqItem[] = [];

  constructor() {
   this.faqList = [
      {
        value: 'Portfolio Manager',
        display: 'Dan Niles'
          },
          {
            value: 'SEC Exempt Reporting Adviser',
            display: 'STP Investment Partners, LLC'
          },
          {
            value: 'Subscriptions',
            display: 'Monthly'
          },
          {
            value: 'Redemptions',
            display: 'Quarterly (30 day notice)'
          },
          {
            value: 'High Water Mark',
            display: 'Yes'
          },
          {
            value: 'Management Fee',
            display: '2%'
          },
          {
            value: 'Performance Fee',
            display: '20%'
          },
          {
            value: 'Prime Broker',
            display: 'BTIG, LLC'
          },
          {
            value: 'Custodian of Assets',
            display: 'Goldman Sachs & Co.'
          },
          {
            value: 'Fund Administrator',
            display: 'STP Investment Services, LLC'
          },
          {
            value: 'Auditor',
            display: 'BBD, LLP'
          },
          {
            value: 'Tax Reporting',
            display: 'Form K-1'
          }
    ];
   };

  ngOnInit(): void {
  };

}
