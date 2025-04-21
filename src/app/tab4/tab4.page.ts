import { Component } from '@angular/core';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-tab4',
  templateUrl: 'tab4.page.html',
  styleUrls: ['tab4.page.scss'],
  standalone: false
})
export class Tab4Page {
  constructor(private alertCtrl: AlertController) {}

  // Method to display a help alert with information on data protection
  async presentHelp() {
    // Creating an alert with a header, message, and OK button
    const alert = await this.alertCtrl.create({
      header: 'Need Help?', // Title of the alert
      message: 'This page explains how we protect your data and ensure secure inventory management.',   // Message displayed in the alert
      buttons: ['OK'] // Button text for dismissing the alert
    });
    await alert.present();  // Display the alert to the user
  }
}
