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

  async presentHelp() {
    const alert = await this.alertCtrl.create({
      header: 'Need Help?',
      message: 'This page explains how we protect your data and ensure secure inventory management.',
      buttons: ['OK']
    });
    await alert.present();
  }
}
