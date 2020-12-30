export class BrandModel{
    
    constructor(alt: string, asset: string, url: string){
        this.assetUrl = asset;
        this.altString = alt;
        this.brandUrl = url;
    }

    assetUrl!: string;
    altString!: string;
    brandUrl!: string;
}