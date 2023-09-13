import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {PersonService} from "../../services/person.service";
import {person} from "../../models/person";
import {Component} from "@angular/core";
import {Sell} from "../../models/sell";


@Component({
  selector: 'app-registration-form',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.css']
})
export class SellComponent {

  private sell: Sell = new Sell()

  constructor(private fb: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              private personService: PersonService) {
  }

  newReg = this.fb.group({
    price: new FormControl('', [Validators.required])
  });

  onSubmit() {

    this.sell.price = parseInt(this.newReg.get("price").value)
    this.personService.personGetId().subscribe(value => {
      this.sell.id=value
      this.personService.makeSell(this.sell).subscribe();
      this.router.navigate(['/wrapper/home'])
    })
  }
}
