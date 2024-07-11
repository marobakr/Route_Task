import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Chart, registerables } from 'chart.js';
import { ITransaction } from '../../interface';

Chart.register(...registerables);

/**
 * Component to display a chart of transactions.
 */
@Component({
  selector: 'app-transaction-chart',
  standalone: true,
  templateUrl: './transaction-chart.component.html',
  styleUrls: ['./transaction-chart.component.scss'],
})
export class TransactionChartComponent implements OnChanges {
  /**
   * Input property to receive transactions data.
   */
  @Input() transactions: ITransaction[] = [];

  /**
   * Chart instance.
   */
  chart: any;

  /**
   * @param changes - Object of SimpleChanges that holds current and previous values.
   */
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['transactions'] && this.transactions.length) {
      this.createChart();
    }
  }

  /**
   * Creates the chart and sets its data and configuration.
   */
  createChart(): void {
    const transactionData = this.aggregateTransactionsByDate(this.transactions);
    const labels = Object.keys(transactionData);
    const data = Object.values(transactionData);

    if (this.chart) {
      this.chart.destroy();
    }
    if (labels.length === 1) {
      // If there's only one transaction, add an extra point for visibility
      labels.push(labels[0]);
      data.push(data[0]);
    }

    this.chart = new Chart('transactionChart', {
      type: 'line',
      data: {
        labels,
        datasets: [
          {
            label: 'Total Transaction Amount',
            data,
            borderColor: '#673AB7',
            backgroundColor: 'rgb(103, 58, 183, 0.72)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        animation: {
          duration: 1000,
          easing: 'easeInOutQuad',
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Date',
            },
          },
          y: {
            title: {
              display: true,
              text: 'Amount',
            },
          },
        },
        plugins: {
          legend: {
            position: 'top',
          },
          tooltip: {
            mode: 'index',
            intersect: false,
          },
        },
        interaction: {
          mode: 'nearest',
          intersect: false,
        },
      },
    });
  }

  /**
   * Aggregates the transactions by date.
   * @param transactions - Array of transactions.
   * @returns An object where keys are dates and values are total transaction amounts for those dates.
   */
  aggregateTransactionsByDate(transactions: any[]): { [key: string]: number } {
    return transactions.reduce((acc, transaction) => {
      console.log('transactions', transactions);
      console.log('acc', acc);
      console.log('transaction', transaction);

      const date = new Date(transaction.date).toLocaleDateString();
      if (!acc[date]) {
        acc[date] = 0;
      }
      acc[date] += transaction.amount;
      return acc;
    }, {});
  }
}
