import { Component, Input, OnInit } from '@angular/core';
// import { Location } from '../home-list/home-list.component';
import { Location, Review } from "../location";
import { Loc8rDataService } from '../loc8r-data.service';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-location-details',
  // standalone: true,
  // imports: [],
  templateUrl: './location-details.component.html',
  styleUrl: './location-details.component.css'
})

export class LocationDetailsComponent implements OnInit {

  @Input() location!: Location;

  public newReview: Review = {
    author: '',
    rating: 5,
    reviewText: ''
  };

  public formVisible: boolean = false;
  public formError!:string;

  public googleAPIKey: string = 'YOUR_GOOGLE_MAPS_API_KEY';

  constructor(
    private loc8rDataService: Loc8rDataService,
    private authenticationService: AuthenticationService
  ) {}

  ngOnInit(): void {}

  private formIsValid():boolean{
    if(this.newReview.author && this.newReview.rating && this.newReview.reviewText){
      return true;
    }else {
      return false;
    }
  }

  private resetAndHideReviewForm(): void{
    this.formVisible = false;
    this.newReview.author='';
    this.newReview.rating=5;
    this.newReview.reviewText='';
  }

  public onReviewSubmit(): void{
    this.formError='';
    this.newReview.author = this.getUsername();
    if(this.formIsValid()){
      this.loc8rDataService.addReviewByLocationId(this.location._id, this.newReview)
      .then( (review: Review) =>{
        console.log('Review saved',review);
        let reviews=this.location.reviews.slice(0);
        reviews.unshift(review);
        this.location.reviews=reviews;
        this.resetAndHideReviewForm();        
      });
    } else {
      this.formError='All fields required, please try again';
    }
  }

  public isLoggedIn(): boolean {
    return this.authenticationService.isLoggedIn();
  }

  public getUsername(): string {
    const { name } = this.authenticationService.getCurrentUser();
    return name ? name : 'Guest';
  }    
}

