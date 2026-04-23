import {
  AfterViewInit,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  OnDestroy,
  viewChild,
} from '@angular/core';
import { HospitalIcon } from '../../../../shared/icons/hospital-icon/hospital-icon';
import { InjectionIcon } from '../../../../shared/icons/injection-icon/injection-icon';
import { HandIconSvg } from '../../../../shared/icons/hand-icon/hand-icon';

@Component({
  selector: 'app-section-2',
  imports: [HospitalIcon, InjectionIcon, HandIconSvg],
  templateUrl: './section-2.html',
})
export class Section2 implements AfterViewInit, OnDestroy {
  private readonly cdr = inject(ChangeDetectorRef);

  public readonly slides = [
    {
      image: 'assets/slide1.png',
      title: 'All Your Pharmacy Needs. Absolutely Free',
      desc: 'Access medications, medical supplies, and specialized compounding services in one unified platform. No hidden costs — just a simple, way to find exactly what you need, when you need it.',
    },
    {
      image: 'assets/slide2.png',
      title: 'Find Medicines Near You Instantly',
      desc: 'Quickly locate nearby pharmacies and check real-time medicine availability without the hassle of calling multiple stores. Get accurate results within seconds and make faster decisions for your health.',
    },
    {
      image: 'assets/slide3.png',
      title: 'Save Time. Get Results Faster',
      desc: 'Avoid unnecessary delays and long searches. Connect directly with pharmacies that have your required medicines in stock, helping you save valuable time during urgent situations.',
    },
    {
      image: 'assets/slide4.png',
      title: 'Trusted & Verified Pharmacies',
      desc: 'Browse through a network of licensed and verified pharmacies to ensure safety, authenticity, and reliability. Your health deserves trusted sources, and we make sure you only see the best options.',
    },
  ];

  public readonly slider = viewChild<ElementRef<HTMLDivElement>>('slider');
  public currentIndex = 0;
  private intervalId: ReturnType<typeof setInterval> | null = null;

  public ngAfterViewInit(): void {
    queueMicrotask(() => {
      this.startAutoSlide();
    });
  }

  public ngOnDestroy(): void {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
  }

  private startAutoSlide(): void {
    this.intervalId = setInterval(() => {
      this.nextSlide();
    }, 10000);
  }

  public nextSlide(): void {
    const total = this.slides.length;
    this.currentIndex = (this.currentIndex + 1) % total;
    this.scrollToIndex();
  }

  public goToSlide(index: number): void {
    this.currentIndex = index;
    this.scrollToIndex();
  }

  private scrollToIndex(): void {
    const container = this.slider()?.nativeElement;
    if (!container) return;

    const width = container.clientWidth;

    container.scrollTo({
      left: width * this.currentIndex,
      behavior: 'smooth',
    });
  }

  public onScroll(): void {
    const container = this.slider()?.nativeElement;
    if (!container) return;

    const width = container.clientWidth;

    this.currentIndex = Math.round(container.scrollLeft / width);

    this.cdr.detectChanges();
  }
}
